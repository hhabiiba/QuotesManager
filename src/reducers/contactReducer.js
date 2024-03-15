import { SUBMIT_CONTACT_FORM } from '../actions/contactAction';

const initialState = {
  name: '',
  email: '',
  message: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_CONTACT_FORM:
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        message: action.payload.message
      };
      case SUBMIT_CONTACT_FORM:
      return initialState;
    default:
      return state;
  }
};

export default reducer;


  
