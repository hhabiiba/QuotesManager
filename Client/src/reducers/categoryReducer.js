import { SET_QUOTES } from '../actions/categoryAction';

const initialState = {
    quotes: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_QUOTES:
      return {
        ...state,
        quotes: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
