import { configureStore } from '@reduxjs/toolkit';
import addReducer from './reducers/addReducer';
import editReducer from './reducers/editReducer'; 
import categoryReducer from './reducers/categoryReducer';
import contactReducer from './reducers/contactReducer';

const store = configureStore({
  reducer: {
    add: addReducer,
    edit: editReducer,
    category: categoryReducer,
    contact: contactReducer
  }
});

export default store;