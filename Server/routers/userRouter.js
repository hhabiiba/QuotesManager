const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Quote = require('../models/quoteModel');
const QuoteList = require('../models/quoteListModel');

userRouter.get('/receive', async (req, res) => {
    console.log("Received request to test endpoint for userRouter");
    res.json({
      message: "Endpoint test for userRouter"
    });
});

// GET all users
userRouter.get('/', async (req, res) => {
    try {
      console.log("Received request to get all users");
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
      console.log("Received request to get user by ID:", req.params.id);
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
      console.log("Received request to create a new user:", req.body);
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
      console.log("Received request to update user by ID:", req.params.id, req.body);
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
      console.log("Received request to delete user by ID:", req.params.id);
      const { id } = req.params;
      const quoteListIds = (await User.findById(id)).quoteLists.map(id => id.toJSON());
      const quoteLists = await Promise.all(quoteListIds.map(id => QuoteList.findById(id)));
      const quoteIds = quoteLists.map(quoteList => quoteList.quotes).flat().map(id => id.toJSON());
      await User.findByIdAndDelete(id);
      await Promise.all(quoteListIds.map(id => QuoteList.findByIdAndDelete(id)));
      await Promise.all(quoteIds.map(id => Quote.findByIdAndDelete(id)));

      console.log('User deleted successfully:', id);
      res.status(204).end();
    } catch (err) {
      console.error(err);
      res.status(500).json({  message: err.message });
    }
});
  
module.exports = userRouter;