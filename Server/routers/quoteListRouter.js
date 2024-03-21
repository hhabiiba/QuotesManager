const express = require('express');
const listRouter = express.Router();
const QuoteList = require('../models/quoteListModel');

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
listRouter.post('/', async (req, res) => {
  try {
    console.log("Received request to create a list:", req.body);
    const { name, quotes } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Name is required for creatin a quote list' });
    }
    const newQuoteList = new QuoteList({ name, quotes });
    await newQuoteList.save();
    res.status(201).json(newQuoteList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a quote list by ID
listRouter.put('/:id', async (req, res) => {
  try {
    console.log("Received request to update a quote list:", req.params.id, req.body);
    const { name, quotes } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Name is required for updating a list' });
    }
    const updatedQuoteList = await QuoteList.findByIdAndUpdate(req.params.id, { name, quotes }, { new: true });
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
    const deletedQuoteList = await QuoteList.findByIdAndDelete(req.params.id);
    if (!deletedQuoteList) {
      return res.status(404).json({ message: 'Quote list not found' });
    }
    res.json({ message: 'Quote list deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = listRouter;