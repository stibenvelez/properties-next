import properties from "./properties";
import cities from "./cities";
import auth from "./auth";
import users from "./user";
import contact from "./contact";
import comments from "./comments"
import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
    reducer: {
        properties,
        cities,
        auth,
        users,
        contact,
        comments,
    },
});

