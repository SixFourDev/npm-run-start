const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const stripe = require('./utils/stripe');
const dbConnection = require('./config/connection');

require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

const stripeKey = process.env.STRIPE_KEY;

if (!stripeKey) {
    console.error('Stripe key is not defined in your .env file');
} else {
    // Use stripeKey to configure Stripe
    const stripe = require('stripe')(stripeKey);

    // Now you can use the "stripe" object to interact with Stripe's API
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        // keep this empty for now
        return {};
    },
    introspection: true,
    playground: true,
});

// Comment out the DB connection for now
dbConnection.on('error', (error) => {
     console.error('Error connecting to the database:', error);
 });

 dbConnection.once('open', async () => {
     console.log('Connected to the database');
 });

// Start the Apollo server middleware directly
server.start().then(() => {
    server.applyMiddleware({ app });

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
});
