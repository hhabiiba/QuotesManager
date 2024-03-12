import { SET_SELECTED_CATEGORY, SET_QUOTES_FOR_SELECTED_CATEGORY, SET_SELECTED_QUOTE, SET_FORM_DATA} from "../actions/editAction";

const initialState = {
    selectedCategory: '',
    selectedQuote: null,
    formData: {
      quoteText: '',
      author: '',
      category: '',
    },
    quotesForSelectedCategory: [],
  };

  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_SELECTED_CATEGORY:
        return {
          ...state,
          selectedCategory: action.payload,
        };
      case SET_QUOTES_FOR_SELECTED_CATEGORY: 
        return {
          ...state,
          quotesForSelectedCategory: action.payload,
        };
      case SET_SELECTED_QUOTE:
        return {
          ...state,
          selectedQuote: action.payload,
        };
      case SET_FORM_DATA:
        return {
          ...state,
          formData: action.payload,
        };
      default:
        return state;
    }
};

export default reducer;