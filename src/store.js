import { configureStore } from '@reduxjs/toolkit';
import addReducer from './reducers/addReducer';
import editReducer from './reducers/editReducer'; 
import categoryReducer from './reducers/categoryReducer';

const store = configureStore({
  reducer: {
    add: addReducer,
    edit: editReducer,
    category: categoryReducer
  }
});

export default store;