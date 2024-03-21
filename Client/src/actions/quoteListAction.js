export const ADD_QUOTE_LIST = 'ADD_QUOTE_LIST';
export const DELETE_QUOTE_LIST = 'DELETE_QUOTE_LIST';
export const UPDATE_QUOTE_LIST = 'UPDATE_QUOTE_LIST';

export const addQuoteList = (quoteList) => ({
  type: ADD_QUOTE_LIST,
  payload: quoteList,
});

export const deleteQuoteList = (quoteListId) => ({
  type: DELETE_QUOTE_LIST,
  payload: quoteListId,
});

export const updateQuoteList = (quoteList) => ({
  type: UPDATE_QUOTE_LIST,
  payload: quoteList,
});
