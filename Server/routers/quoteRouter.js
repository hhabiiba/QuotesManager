const express = require('express');
const router = express.Router();
const Quote = require('../models/quoteModel');
const QuoteList = require('../models/quoteListModel');

router.get('/receive', async (req, res) => {
    console.log("Received request to test endpoint for router");
    res.json({
      message: "Endpoint test for router"
    })
})
// Get all quotes
router.get('/', async (req, res) => {
  try {
    console.log("Received request to get all quotes");
    const quotes = await Quote.find();
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single quote by ID
router.get('/:id', async (req, res) => {
  try {
    console.log("Received request to get a single quote by ID:", req.params.id);
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
router.post('/:id', async (req, res) => {
  try {
    console.log("Received request to create a new quote:", req.body);
    const { quote, author, category } = req.body;
    const quoteListId = req.params.id;
    if (!quote || !author || !category) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const newQuote = new Quote({ quote, author, category });
    await newQuote.save();
    if (quoteListId) {
      const quoteList = await QuoteList.findById(quoteListId);
      if (!quoteList) {
        return res.status(404).json({ message: 'Quote List not found' });
      }
      quoteList.quotes.push(newQuote);
      await quoteList.save();
    }
      res.status(201).json(newQuote);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// Update a quote by ID
router.put('/:id', async (req, res) => {
    try {
      console.log("Received request to update a quote by ID:", req.params.id, req.body);
      const { id } = req.params;
      const updatedQuoteDetails = req.body;
      const existingQuote = await Quote.findById(id);
      if (!existingQuote) {
        return res.status(404).json({ message: 'Quote not found' });
      }
      await Quote.findByIdAndUpdate(id, updatedQuoteDetails);
      const updatedQuote = await Quote.findById(id);
      res.status(200).json(updatedQuote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a quote by ID
router.delete('/:id', async (req, res) => {
  try {
    console.log("Received request to delete a quote by ID:", req.params.id);
    const { id } = req.params;
    const deletedQuote = await Quote.findByIdAndDelete(id);
    if (!deletedQuote) {
      return res.status(404).json({ message: 'Quote not found' });
    }
    const quoteListId = deletedQuote.quoteListId;
    if (quoteListId) {
      const quoteList = await QuoteList.findById(quoteListId);
      if (!quoteList) {
        return res.status(404).json({ message: 'Quote List not found' });
      }
      quoteList.quotes = quoteList.quotes.filter(q => q.toString() !== id);
      await quoteList.save();
    }
    res.json({ message: 'Quote deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;