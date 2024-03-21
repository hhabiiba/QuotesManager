import { ADD_QUOTE_LIST, DELETE_QUOTE_LIST, UPDATE_QUOTE_LIST } from '../actions/quoteListAction';

const initialState = {
  quoteLists: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_QUOTE_LIST:
      return {
        ...state,
        quoteLists: [...state.quoteLists, action.payload],
      };
    case DELETE_QUOTE_LIST:
      return {
        ...state,
        quoteLists: state.quoteLists.filter((list) => list.id !== action.payload),
      };
    case UPDATE_QUOTE_LIST:
      return {
        ...state,
        quoteLists: state.quoteLists.map((list) =>
          list.id === action.payload.id ? action.payload : list
        ),
      };
    default:
      return state;
  }
};

export default reducer;
