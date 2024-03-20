const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

userRouter.get('/receive', async (req, res) => {
    res.json({
      message: "Endpoint test for userRouter"
    });
});

// GET all users
userRouter.get('/', async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message  });
    }
});

// GET user by ID
userRouter.get('/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({  message: err.message  });
    }
});

// Create a new user
userRouter.post('/', async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log(req.body);
      if (!username || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      const existingUser = await User.countDocuments({ username }).exec();
      if (existingUser !== 0) {
        return res.status(400).json({ error: 'Username already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ 
        username, 
        password: hashedPassword 
    });
      console.log(newUser);
      await newUser.save();
      res.status(201).json(newUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message  });
    }
});

// Update user by ID
userRouter.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({  message: err.message });
    }
});

// DELETE user by ID
userRouter.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      console.log('User deleted successfully:', deletedUser);
      res.status(204);
    } catch (err) {
      console.error(err);
      res.status(500).json({  message: err.message });
    }
});
  
module.exports = userRouter;