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
        setQuotesListData(state, action) {
            state.quoteListData = action.payload
        }
    }
})

export const { setUserData, setQuotesListData } = quoteSlice.actions
export default quoteSlice.reducer;