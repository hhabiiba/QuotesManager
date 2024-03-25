import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setQuotesListData } from '../reducers/quotesReducer';

const baseURL = '/api/quotes';

// const fetchAllQuotes = async() => {
//     const user = useSelector(state => state.quote.userData);
//     const quoteListIds = user.quoteLists;

//     const quoteListData = [];
//     for (const quoteListId of quoteListIds) {
//         const quoteListResponse = await axios.get(`http://localhost:4000/api/quoteLists/${quoteListId}`)
//         const quoteList = quoteListResponse.data;

//         const quoteData = [];
//         for (const quoteId of quoteList.quotes) {
//             const quotesResponse = await axios.get(`http://localhost:4000/api/quotes/${quoteId}`);
//             quoteData.push(quotesResponse.data)
//         }
//         quoteList.quotes = quotesData;
//         quoteListData.push(quoteList)
//     }
//     dispatch(setQuotesListData(quoteListData))
//     localStorage.setItem('quotesListData', quoteListData)
// }

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
    fetchAllQuotes,
    getAllQuotes,
    getQuoteById,
    addQuote,
    updateQuote,
    deleteQuote,
};