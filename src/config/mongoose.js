const mongoose = require('mongoose');
const config = require('./constants');

async function setupMongoose() {
    mongoose.set('strictQuery', false);
    await mongoose.connect(
        config.DB_URI,
        { useNewUrlParser: true, useUnifiedTopology: true },
    );
    console.log('DB connected');
}

module.exports = setupMongoose;
