export const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEFORY';
export const SET_QUOTES_FOR_SELECTED_CATEGORY = 'SET_QUOTES_FOR_SELECTED_CATEGORY'
export const SET_SELECTED_QUOTE = 'SET_SELECTED_QUOTE';
export const SET_FORM_DATA = 'SET_FORM_DATA';

export const setSelectedCategory = (category) => ({
    type: SET_SELECTED_CATEGORY,
    payload: category,
});

export const setQuotesForSelectedCategory = (quotes) => ({
    type: SET_QUOTES_FOR_SELECTED_CATEGORY,
    payload: quotes,
});

export const setSelectedQuote = (quote) => ({
    type: SET_SELECTED_QUOTE,
    payload: quote,
});
  
export const setFormData = (data) => ({
    type: SET_FORM_DATA,
    payload: data,
});