require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express(); 
const quoteRouter = require('./routers/quoteRouter');

// Middleware
app.use(cors()); 
app.use(express.json());

// Routes
app.use('/api/quotes', quoteRouter);

// MongoDB connection..
const dbURL = process.env.mongoDB_URL;
mongoose.connect(dbURL);
const db = mongoose.connection;
db.on('error', (err) => console.err('Failed! connecting to database', err));
db.once('open', () => {
    console.log('MongoDB connected successfully..');
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});