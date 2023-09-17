const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const cors = require('cors');
const { decodeToken } = require('./utils/auth.js');  // Update this import
const { typeDefs, resolvers } = require('./schemas');
const dbConnection = require('./config/connection');
const stripe = require('./utils/stripe.js');

require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.headers.authorization || '';
        const user = decodeToken(token); 
        return { user };
    }
});

dbConnection.on('error', (error) => {
    console.error('Error connecting to the database:', error);
});

dbConnection.once('open', async () => {
    console.log('Connected to the database');

    await server.start();

    server.applyMiddleware({ app });  

    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client')));

        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/index.html'));
        });
    }

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);  // Using graphqlPath is correct here
    });
});
