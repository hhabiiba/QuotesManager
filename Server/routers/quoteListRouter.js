const express = require('express');
const listRouter = express.Router();
const QuoteList = require('../models/quoteListModel');
const User = require('../models/userModel');

listRouter.get('/receive', async (req, res) => {
    console.log("Received req to test endpoint for quoteList router");
    res.json({
      message: "Endpoint test for quoteList router"
    })
})
// GET all quote lists
listRouter.get('/', async (req, res) => {
  try {
    console.log("Received request to get all lists of quotes");
    const quoteLists = await QuoteList.find().populate('quotes');
    res.json(quoteLists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single lists of quotes by ID
listRouter.get('/:id', async (req, res) => {
  try {
    console.log("Received request to get a single list by ID:", req.params.id);
    const quoteList = await QuoteList.findById(req.params.id).populate('quotes');
    if (!quoteList) {
      return res.status(404).json({ message: 'Quote list not found' });
    }
    res.json(quoteList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new quote list
listRouter.post('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    
    const { name } = req.body;
    console.log("User ID:", userId);
    if (!name) {
      return res.status(400).json({ message: 'Name is required for creating a quote list' });
    }
    const user = await User.findById(userId);
    console.log("User:", user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const newQuoteList = new QuoteList({ name, user: userId });
    await newQuoteList.save();
    user.quoteLists.push(newQuoteList._id); 
    await user.save();
    res.status(201).json(newQuoteList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a quote list by ID
listRouter.put('/:id', async (req, res) => {
  try {
    console.log("Received request to update a quote list:", req.params.id, req.body);
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Name is required for updating a list' });
    }
    const updatedQuoteList = await QuoteList.findByIdAndUpdate(req.params.id, { name }, { new: true });
    if (!updatedQuoteList) {
      return res.status(404).json({ message: 'Quote list not found' });
    }
    res.json(updatedQuoteList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a quote list by ID
listRouter.delete('/:id', async (req, res) => {
  try {
    console.log("Received request to delete a quote list by ID:", req.params.id);
    const quoteListId = req.params.id;
    const userId = req.body.userId; 
    const quoteList = await QuoteList.findById(quoteListId);
    if (!quoteList) {
      return res.status(404).json({ message: 'Quote list not found' });
    }
    console.log("User ID associated with the quote list:", quoteList.user);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.quoteLists = user.quoteLists.filter(id => id.toString() !== quoteListId);
    await user.save();
    await QuoteList.findByIdAndDelete(quoteListId);
    return res.status(200).json({ message: 'Quote list deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = listRouter;