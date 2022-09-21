import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    loadingComments: false,
    comments: [],
    comment: {},
    error: false,
    msg: null,
};

export const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        setGetCommentsByProperty: (state) => {
            state.loadingComments = true;
        },
        setGetCommentsByPropertySuccess: (state, action) => {
            state.loadingComments = false;
            state.comments = action.payload;
        },
        setGetCommentsByPropertyError: (state) => {
            state.loadingComments = false;
        },
        setGetComment: (state) => {
            state.loading = true;
            state.error = false;
            state.msg = null;
        },
        setGetCommentSuccess: (state, action) => {
            state.loading = false;
            state.comment = action.payload;
            state.error = false;
        },
        setGetCommentError: (state, action) => {
            state.loading = false;
            state.error = true;
            state.msg = action.payload;
        },
        setCreateNewComment: (state, action) => {
            state.loading = true;
        },
        setCreateNewCommentSuccess: (state, action) => {
            state.loading = false;
        },
        setCreateNewCommentError: (state, action) => {
            state.loading = false;
        },
    },
});

export const {
    setGetCommentsByProperty,
    setGetCommentsByPropertySuccess,
    setGetCommentsByPropertyError,
    setGetComment,
    setGetCommentSuccess,
    setGetCommentError,
    setCreateNewComment,
    setCreateNewCommentSuccess,
    setCreateNewCommentError,
} = commentsSlice.actions;
export default commentsSlice.reducer;
