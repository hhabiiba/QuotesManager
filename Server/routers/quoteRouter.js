const express = require('express');
const router = express.Router();
const Quote = require('../models/quoteModel');

router.get('/receive', async (req, res) => {
    res.json({
      message: "Endpoint test for router"
    })
})
// Get all quotes
router.get('/', async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single quote by ID
router.get('/:id', async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }
    res.json(quote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new quote
router.post('/', async (req, res) => {
    try {
      const { quote, author, category } = req.body;
      if (!quote || !author || !category) {
        return res.status(400).json({message: 'Missing required fields'});
      }
      const newQuote = new Quote({ quote, author, category});
      await newQuote.save();
      res.status(201).json(newQuote);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// Update a quote by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { quote, author, category } = req.body;
    if (!quote || !author || !category) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const updatedQuote = await Quote.findByIdAndUpdate(id, { quote, author, category },{ new: true });
    if (!updatedQuote) {
      return res.status(404).json({ message: 'Quote not found' });
    }
    res.json(updatedQuote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a quote by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuote = await Quote.findByIdAndDelete(id);
    if (!deletedQuote) {
      return res.status(404).json({ message: 'Quote not found' });
    }
    res.json({ message: 'Quote deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;