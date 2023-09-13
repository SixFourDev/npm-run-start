const express = require('express');
const { ApolloServer } = require('@apollo/server');
const path = require('path');
const { authMiddleWare } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.applyMiddleware({ app });

// i need to start the apollo server and talk to the client folders with axios
app.use(express.status(path.join(__dirname, 'client')));

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})