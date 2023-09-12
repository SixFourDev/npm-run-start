const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_KEY || '') // in the quotations the mongodb connection will go 

module.exports = mongoose.connection