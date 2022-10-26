import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from "next-redux-wrapper";
const initialState = {
    curUrl: "",
}

export const browserSlice = createSlice({
    name: "browser",
    initialState,
    reducers: {
        setURL(state, action) {
            state.curUrl = action.payload;
        },
        extraReducers: {
            [HYDRATE]: (state, action) => {
                return {
                    ...state,
                    ...action.payload.curBrowser,
                };
            },
        },
    },
})
export const { setURL } = browserSlice.actions;
export const getCurrentURL = (state) => state.browser.curUrl;


export default browserSlice.reducer;