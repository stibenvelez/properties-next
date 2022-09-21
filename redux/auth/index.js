import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        auth: false,
        user: {},
        msg: null,
        loading: true,
        error: false,
    },
    reducers: {
        setAuth: (state) => {
            state.loading = true;
        },
        setNotAuth: (state) => {
            state.loading = false;
            state.auth = false;
            state.user = {};
            state.msg = null;
            state.error = false;
        },
        setAuthSuccess: (state, action) => {
            state.auth = true;
            state.user = action.payload;
            state.loading = false;
        },
        setAuthError: (state, action) => {
            state.loading = false;
        },
        setLogin: (state) => {
            state.loading = true;
            state.error = false;
            state.msg = "";
        },
        setLoginSuccess: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.auth = true;
            state.error = false;
            state.msg = "";
        },
        setLoginError: (state, action) => {
            state.loading = false;
            state.error = true;
            state.auth = false;
            state.msg = action.payload;
        },
        setSignOut: (state, action) => {
            state.loading = true;
            state.auth = true;
        },
        setSignOutSucces: (state, action) => {
            state.auth = false;
            state.user = {};
            state.loading = false;
            state.error = false;
        },
        setSignOutError: (state, action) => {
            state.error = true;
        },
    },
});

export const {
    setAuth,
    setNotAuth,
    setAuthSuccess,
    setAuthError,
    setLogin,
    setLoginSuccess,
    setLoginError,
    setSignOut,
    setSignOutSucces,
    setSignOutError,
} = authSlice.actions;

export default authSlice.reducer;
