import { configureStore } from '@reduxjs/toolkit';
import addReducer from './reducers/addReducer';
import editReducer from './reducers/editReducer';
import categoryReducer from './reducers/categoryReducer';
import contactReducer from './reducers/contactReducer';
import quoteListsReducer from './reducers/quoteListReducer';
import quotesReducer from './reducers/quotesReducer'

const store = configureStore({
    reducer: {
        quote: quotesReducer,
        add: addReducer,
        edit: editReducer,
        category: categoryReducer,
        contact: contactReducer,
        quoteLists: quoteListsReducer
    }
});

export default store;