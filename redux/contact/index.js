import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    isContactSent: false,
    toContact: {},
    toContactList: [],
    msg: null,
    error: false,
};

export const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        setContactMe: (state) => {
            state.loading = true;
            state.isContactSent = false;
        },
        setContactMeSucces: (state, action) => {
            state.loading = false;
            state.isContactSent = true;
        },
        setContactMeError: (state) => {
            state.loading = false;
            state.isContactSent = false;
        },
        resetIsSent: (state) => {
            state.isContactSent = false;
        },
        setGetToContactList: (state) => {
            state.loading = true;
        },
        setGetToContactListSuccess: (state, action) => {
            state.loading = false;
            state.toContactList = action.payload;
        },
        setGetToContactListError: (state) => {
            state.loading = false;
        },
        setGetToContact: (state) => {
            state.loading = true;
            state.error = false;
            state.msg = null;
        },
        setGetToContactSuccess: (state, action) => {
            state.loading = false;
            state.toContact = action.payload;
            state.error = false;
        },
        setGetToContactError: (state, action) => {
            state.loading = false;
            state.error = true;
            state.msg = action.payload;
        },
        setCreateContactManagement: (state) => {
            state.loadingCreateContactManagement = true;
        },
        setCreateContactManagementSuccess: (state, action) => {
            state.loadingCreateContactManagement = false;
        },
        setCreateContactManagementError: (state, action) => {
            state.loadingCreateContactManagement = false;
        },
        setDiscardContact: (state) => {
            state.loading = true;
            state.msg = null;
            state.error = false;
        },
        setDiscardContactSuccess: (state) => {
            state.loading = false;
            state.error = false;
            state.msg = null;
        },
        setDiscardContactError: (state, action) => {
            state.loading = false;
            state.msg = action.payload;
            state.error = true;

            setTimeout(() => {
                state.msg = null;
                state.error = false;
            }, 1000);
        },
        setResetError: (state) => {
            state.error = false;
            state.msg = null;
        },
    },
});

export const {
    setContactMe,
    setContactMeSucces,
    setContactMeError,
    resetIsSent,
    setGetToContact,
    setGetToContactSuccess,
    setGetToContactError,
    setGetToContactList,
    setGetToContactListSuccess,
    setGetToContactListError,
    setCreateContactManagement,
    setCreateContactManagementSuccess,
    setCreateContactManagementError,
    setDiscardContact,
    setDiscardContactSuccess,
    setDiscardContactError,
    setResetError,
} = contactSlice.actions;

export default contactSlice.reducer;
