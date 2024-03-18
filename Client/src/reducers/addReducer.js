import { ADD_QUOTE, ADD_FORM_DATA, SET_NEW_QUOTE } from '../actions/addAction';

const initialState = {
  quotes: [],
  formData: {
    quote: '',
    author: '',
    category: ''
  },
  newQuote: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_QUOTE:
      return {
        ...state,
        quotes: [...state.quotes, action.payload]
      };
    case ADD_FORM_DATA:
      return {
        ...state,
        formData: { ...state.formData, ...action.payload }
      };
    case SET_NEW_QUOTE:
      return {
        ...state,
        newQuote: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
