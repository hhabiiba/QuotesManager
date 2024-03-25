import axios from 'axios';
const baseURL = '/api/quoteLists';

const getAllQuoteLists = async () => {
  try {
    const response = await axios.get(`${baseURL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching quote lists:', error);
    throw error;
  }
};

const addQuoteList = async (userId, newQuoteList) => {
  try {
    const response = await axios.post(`${baseURL}/${userId}`, newQuoteList);
    return response.data;
  } catch (error) {
    console.error('Error adding quote list:', error);
    throw error;
  }
};

const updateQuoteList = async (quoteListId, editedName) => {
  try {
    const response = await axios.put(`${baseURL}/${quoteListId}`, {
      name: editedName,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating quote list:', error);
    throw error;
  }
};

const deleteQuoteList = async (userId, quoteListId) => {
  try {
    const response = await axios.delete(`${baseURL}/${quoteListId}`, {
      data: { userId },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting quote list:', error);
    throw error;
  }
};

export {
  getAllQuoteLists,
  addQuoteList,
  updateQuoteList,
  deleteQuoteList,
};
