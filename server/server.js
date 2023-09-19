const express = require('express');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { decodeToken } = require('./utils/auth.js')
const { typeDefs, resolvers } = require('./schemas');
const dbConnection = require('./config/connection');
const path = require('path');


const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.headers.authorization || '';
        const user = decodeToken(token); 
        return { user };
    
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

    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/dist')));
   
        app.get('*', (req, res) => {
          res.sendFile(path.join(__dirname, '../client/dist/index.html'));
        });
      }

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log(`Use GraphQL at http://localhost:3001/graphql`);
    });
});