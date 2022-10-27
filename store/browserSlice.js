import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from "next-redux-wrapper";
const initialState = {
    curBrowser: 0,
    curUrl: "",
    data: [{
        name: "",
        url: "",
    }, {
        name: "",
        url: "",
    }, {
        name: "",
        url: "",
    }, {
        name: "",
        url: "",
    }]
}

export const browserSlice = createSlice({
    name: "browser",
    initialState,
    reducers: {
        setURL(state, action) {
            state.curUrl = action.payload;
        },
        setBrowser(state, action) {
            state.curBrowser = action.payload;
        },
        setDataByIndex(state, action) {
            state.data[action.payload.index] = action.payload.data;
            // state.data = action.payload;
        },
        extraReducers: {
            [HYDRATE]: (state, action) => {
                return {
                    ...state,
                    ...action.payload.browser,
                };
            },
        },
    },
})
export const { setURL, setBrowser, setDataByIndex } = browserSlice.actions;
export const getCurrentURL = (state) => state.browser.curUrl;
export const getCurrentBrowser = (state) => state.browser.curBrowser;
export const getCurrentBrowserData = (state) => state.browser.data[state.browser.curBrowser];
export const getDataByIndex = id => state => {
    return state.browser.data[id];
}

export default browserSlice.reducer;