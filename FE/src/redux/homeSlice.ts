import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const initialState : {message : string | null} = {message : null}

export const getWelcomeMsg = createAsyncThunk('getWelcomeMsg', async function(_, {rejectWithValue}){
    try {
        const res = await axios.get('http://localhost:3001')
            return res.data
    } catch (error) {
            const axiosError = error as AxiosError
            return rejectWithValue({
                message: axiosError.message,
            })
    }
})
const homeSlice = createSlice({
    name : 'home',
    initialState,
    reducers : {},
    extraReducers : (builder)=>{
        builder.addCase(getWelcomeMsg.fulfilled, (state, action)=>{
            // returning homepage future data from server
        }),
        builder.addCase(getWelcomeMsg.rejected,(state, action)=>{
            // return error from server
        })
    }
})

export default homeSlice.reducer