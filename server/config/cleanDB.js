const mongoose = require('mongoose');
const models = require('../models');
const db = require('./connection');

module.exports = async () => {
    try {
        // Specify the database name and collection names
        const databaseName = 'test';
        const collectionNames = ['orders', 'users', 'products'];

        // Use the specified database name
        const dbConnection = mongoose.connection.useDb(databaseName);

        // Loop through each collection name and drop it
        for (const collectionName of collectionNames) {
            const collection = dbConnection.collection(collectionName);
            const collectionInfo = await collection.listIndexes().toArray();
            
            if (collectionInfo.length) {
                // The collection exists, you can drop it
                await collection.drop();
                console.log(`Collection ${collectionName} in database ${databaseName} dropped.`);
            } else {
                console.log(`Collection ${collectionName} in database ${databaseName} not found.`);
            }
        }
    } catch (err) {
        throw err;
    }
}