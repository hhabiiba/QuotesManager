import axios from 'axios';

const baseURL = '/api/quotes';

const getAllQuotes = async () => {
  try {
    const response = await axios.get(baseURL);
    return response.data;
  } catch (error) {
    console.error('Error fetching quotes:', error);
    throw error;
  }
};

const getQuoteById = async (quoteId) => {
  try {
    const response = await axios.get(`${baseURL}/${quoteId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching quote by ID:', error);
    throw error;
  }
};

const addQuote = async (userId, newQuote) => {
  try {
    const response = await axios.post(`${baseURL}/${userId}`, newQuote);
    return response.data;
  } catch (error) {
    console.error('Error adding quote:', error);
    throw error;
  }
};

const updateQuote = async (updatedQuote) => {
  try {
    const response = await axios.put(`${baseURL}/${updatedQuote.id}`, updatedQuote);
    return response.data;
  } catch (error) {
    console.error('Error updating quote:', error);
    throw error;
  }
};

const deleteQuote = async (quoteId, userId) => {
  try {
    const response = await axios.delete(`${baseURL}/${quoteId}`, { data: { userId } });
    return response.data;
  } catch (error) {
    console.error('Error deleting quote:', error);
    throw error;
  }
};

export {
  getAllQuotes,
  getQuoteById,
  addQuote,
  updateQuote,
  deleteQuote,
};
