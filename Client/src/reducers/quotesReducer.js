import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userData: {},
    quoteListData: [],
}

const quoteSlice = createSlice({
    name: 'quote',
    initialState,
    reducers: {
        setUserData(state, action) {
            state.userData = action.payload;
        },
        setUserQuoteList(state, action) {
            state.userData.quoteLists = action.payload;
        },
        setQuotesListData(state, action) {
            state.quoteListData = action.payload
        },
        deleteList(state, action) {
            const index = action.payload;
            state.quoteListData.splice(index, 1);
        }
    }
})

export const { setUserData, setQuotesListData, deleteList, setUserQuoteList } = quoteSlice.actions
export default quoteSlice.reducer;