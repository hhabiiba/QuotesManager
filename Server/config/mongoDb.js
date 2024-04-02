const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async() => {
    try {
        const dbURL = process.env.NODE_ENV === "test" ? process.env.Test_MongoDB_URL : process.env.MongoDB_URL
        await mongoose
            .connect(dbURL);
        console.log('MongoDB connected successfully..');
    } catch (err) {
        console.error('Failed! connecting to database', err);
        throw err;
    }
};

const closeDB = async() => {
    try {
        await mongoose
            .connection.close();
        console.log('MongoDB connection closed.');
    } catch (err) {
        console.error('Failed to close MongoDB connection:', err);
        throw err;
    }
};

module.exports = { connectDB, closeDB };