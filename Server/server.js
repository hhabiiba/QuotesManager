require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express(); 
const { connectDB } = require('./config/mongoDb');
const quoteRouter = require('./routers/quoteRouter');

// Middleware
app.use(cors()); 
app.use(express.json());

// Routes
app.use('/api/quotes', quoteRouter);

// Connect to MongoDB
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server running on PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });