import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setQuotesListData } from '../reducers/quotesReducer';

const baseURL = '/api/quotes';

export async function fetchAllQuotes(quoteListIds) {
    try {
        const quoteListData = [];
        for (const quoteListId of quoteListIds) {
            // Fetch quotes for the current quote list ID
            const response = await axios.get(`http://localhost:4000/api/quoteLists/${quoteListId}`);
            const { name, quotes } = response.data;
            quoteListData.push({ name, quotes });
        }

        return quoteListData;
    } catch (error) {
        throw new Error('Error fetching quotes:', error);
    }
}

const getAllQuotes = async() => {
    try {
        const response = await axios.get(baseURL);
        return response.data;
    } catch (error) {
        console.error('Error fetching quotes:', error);
        throw error;
    }
};

const getQuoteById = async(quoteId) => {
    try {
        const response = await axios.get(`${baseURL}/${quoteId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching quote by ID:', error);
        throw error;
    }
};

const addQuote = async(userId, newQuote) => {
    try {
        const response = await axios.post(`${baseURL}/${userId}`, newQuote);
        return response.data;
    } catch (error) {
        console.error('Error adding quote:', error);
        throw error;
    }
};

const updateQuote = async(updatedQuote) => {
    try {
        const response = await axios.put(`${baseURL}/${updatedQuote.id}`, updatedQuote);
        return response.data;
    } catch (error) {
        console.error('Error updating quote:', error);
        throw error;
    }
};

const deleteQuote = async(quoteId, userId) => {
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