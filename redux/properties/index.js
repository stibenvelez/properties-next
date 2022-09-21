import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    properties: [],
    filters: {
    },
    error: false,
    loading: false,
    loadingUploadCsv: false,
    loadingUploadImages: false,
    response: null,
    property: {},
    loadingComments: false,
};

export const propertiesSlice = createSlice({
    name: "properties",
    initialState,
    reducers: {
        setProperties: (state) => {
            state.loading = true;
        },
        setPropertiesSucces: (state, action) => {
            state.properties = action.payload;
            state.loading = false;
        },
        setPropertiesError: (state) => {
            state.loading = false;
            state.properties = [];
        },
        setGetPorperty: (state) => {
            state.loading = true;
        },
        setGetPorpertySuccess: (state, action) => {
            state.loading = false;
            state.property = action.payload;
        },
        setGetPorpertyError: (state) => {
            state.loading = false;
        },
        setFilters: (state, action) => {
            state.filters = action.payload;
        },
        setclearFilter: (state) => {
            state.filters = initialState.filters;
        },
        setUploadPropertiescsv: (state) => {
            state.loading = true;
            state.error = false;
            state.loadingUploadCsv = true;
            state.response = null;
        },
        setUploadPropertiescsvSucces: (state, action) => {
            state.loadingUploadCsv = false;
            state.error = false;
        },
        setUploadPropertiescsvError: (state, action) => {
            state.loadingUploadCsv = false;
            state.response = action.payload;
            state.error = true;
            state.loading = false;
        },
        setUploadImages: (state, action) => {
            state.loadingUploadImages = true;
            state.error = false;
        },
        setUploadImagesSucces: (state, action) => {
            state.loadingUploadImages = false;
        },
        setUploadImagesError: (state, action) => {
            state.loadingUploadImages = false;
        },
        setCreateProperty: (state, action) => {
            state.loading = true;
            state.error = false;
        },
        setCreatePropertySuccess: (state, action) => {
            state.loading = false;
        },
        setCreatePropertyError: (state, action) => {
            state.loading = false;
        },
        setPropertyByUser: (state, action) => {
            state.loading = true;
            state.properties = action.payload;
            state.error = false;
        },
        setPropertyByUserSucces: (state, action) => {
            state.loading = false;
            state.property = action.payload;
        },
        setPropertyByUserError: (state, action) => {
            state.loading = false;
            state.error= true;
            state.msg = action.payload;
        },
        setUpdateProperty: (state, action) => {
            state.loading = true;
        },
        setUpdatePropertySuccess: (state, action) => {
            state.loading = false;
        },
        setUpdatePropertyError: (state, action) => {
            state.loading = false;
        },
        setDeleteProperty: (state, action) => {
            state.loading = true;
            state.error = false;
        },
        setDeletePropertySuccess: (state, action) => {
            state.loading = false;
        },
        setDeletePropertyError: (state, action) => {
            state.loading = false;
        },
        setCreateNewComment: (state, action) => {
            state.loadingComments = true;
        },
        setCreateNewCommentSuccess: (state, action) => {
            state.loadingComments = false;
        },
        setCreateNewCommentError: (state, action) => {
            state.loadingComments = false;
        }
    },
});

export const {
    setProperties,
    setPropertiesSucces,
    setPropertiesError,
    setGetPorperty,
    setGetPorpertySuccess,
    setGetPorpertyError,
    setFilters,
    setclearFilter,
    setUploadPropertiescsv,
    setUploadPropertiescsvSucces,
    setUploadPropertiescsvError,
    setUploadImages,
    setUploadImagesSucces,
    setUploadImagesError,
    setCreateProperty,
    setCreatePropertySuccess,
    setCreatePropertyError,
    setPropertyByUser,
    setPropertyByUserSucces,
    setPropertyByUserError,
    setUpdateProperty,
    setUpdatePropertySuccess,
    setUpdatePropertyError,
    setDeleteProperty,
    setDeletePropertySuccess,
    setDeletePropertyError,
    setCreateNewComment,
    setCreateNewCommentSuccess,
    setCreateNewCommentError
} = propertiesSlice.actions;

export default propertiesSlice.reducer;
