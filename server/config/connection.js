const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/npm-run-start') // update the URI on the mongoDB side

module.exports = mongoose.connection