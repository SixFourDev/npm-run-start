const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_KEY || 'mongodb://127.0.0.1:27017') // update the URI on the mongoDB side

module.exports = mongoose.connection