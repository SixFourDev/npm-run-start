const mongoose = require('mongoose');
const models = require('../models');
const db = require('../config/connection');

module.exports = async () => {
    try {
        // Specify the database name and collection name
        const databaseName = 'npm-run-start';
        const collectionName = 'shoes_db';

        // Uses the specified database name
        const db = mongoose.connection.useDb(databaseName);

        // Get a reference to the MongoDB collection
        const collection = db.collection(collectionName);

        // Checks if the collection exists
        const collectionInfo = await collection.listIndexes().toArray();

        if (collectionInfo.length) {
            // The collection exists, you can drop it
            await collection.drop();
            console.log(`Collection ${collectionName} in database ${databaseName} dropped.`);
        } else {
            console.log(`Collection ${collectionName} in database ${databaseName} not found.`);
        }
    } catch (err) {
        throw err;
    }
}
