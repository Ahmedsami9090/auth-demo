import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import getProfileSlice from "./getProfileSlice";
import homeSlice from "./homeSlice";



export const reduxStore = configureStore({
    reducer : {
        loginSlice,
        getProfileSlice,
        homeSlice
    }
})
