import { configureStore } from '@reduxjs/toolkit';
import addReducer from './reducers/addReducer';
import editReducer from './reducers/editReducer'; 

const store = configureStore({
  reducer: {
    add: addReducer,
    edit: editReducer 
  }
});

export default store;