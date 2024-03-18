//actionType for addin', savin', updatin'..
export const ADD_QUOTE = 'ADD_QUOTE';
export const ADD_FORM_DATA = 'ADD_FORM_DATA';
export const SET_NEW_QUOTE = 'SET_NEW_QUOTE';

export const addQuote = (quotes) => ({
  type: ADD_QUOTE,
  payload: quotes
});

export const addFormData = (formData) => ({
  type: ADD_FORM_DATA,
  payload: formData
});

export const setNewQuote = (newQuote) => ({ 
  type: SET_NEW_QUOTE,
  payload: newQuote
});
