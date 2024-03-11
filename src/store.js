import { configureStore } from '@reduxjs/toolkit';
import addReducer from './reducers/addReducer';

const store = configureStore({
  reducer: {
    test: addReducer 
  }
});

export default store;