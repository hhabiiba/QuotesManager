const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/database');

const app = express();

mongoose
  .connect(config.mongoURL, {
  })
  .then(() => console.log('MongoDB connected successfully..'))
  .catch(err => console.error('Failed! connecting to database', err));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port- ${PORT}`);
});
