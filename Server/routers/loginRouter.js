const express = require('express');
const loginRouter = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

loginRouter.get('/receive', async (req, res) => {
    console.log("Received request to test endpoint for loginRouter");
    res.json({
      message: "Endpoint test for loginRouter"
    });
});

// POST login
loginRouter.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Username:', username);
    console.log('Password:', password);
    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    // Check if password is correct
    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect) {
      return res.status(401).json({ error: 'Incorrect password' });
    }
    console.log('Login successful');
    // Return user info. on success
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({  message: err.message  });
  }
});

module.exports = loginRouter;