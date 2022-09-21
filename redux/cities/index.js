import { createSlice } from "@reduxjs/toolkit";

export const citiesSlice = createSlice({
    name: "cities",
    initialState: {
        cities: [],
        error: false,
        loading:false,
    },
    reducers: {
        setCities: (state) => {
            state.loading = true;
        },
        setCitiesSuccess: (state, action) => {
            state.cities = action.payload;
            state.loading = false;
        },
        setCitiesError: (state) => {
            state.loading = false;
            state.error = true;
        },
    },
});

export const { setCities, setCitiesSuccess, setCitiesError } =
    citiesSlice.actions;

export default citiesSlice.reducer;
