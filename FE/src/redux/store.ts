import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import getProfileSlice from "./getProfileSlice";
import userSignupSlice from './signupSlice'
import homeSlice from "./homeSlice";



export const reduxStore = configureStore({
    reducer : {
        loginSlice,
        getProfileSlice,
        userSignupSlice,
        homeSlice
    }
})
