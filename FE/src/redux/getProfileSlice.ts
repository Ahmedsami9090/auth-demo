import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


const initialState: {
    name: string | null,
    email: string | null,
    role: string | null,
    id: string | null, 
    error:{
        message: string | null,
        status: number | null
    }
} = {
    name: null,
    email: null,
    role: null,
    id: null,
    error: {
        message: null,
        status: null
    }
}

export const getProfile = createAsyncThunk('getProfile', async function (_, { rejectWithValue }) {
    try {
        const res = await axios.get('http://localhost:3001/auth/profile', {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        return res.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue({
                message: error.response?.data.message || 'failed to get user profile',
                status: error.response?.data.statusCode || 500
            })
        } else {
            return rejectWithValue({
                message: 'An unknown error occurred',
                status: 500
            })
        }
    }
})

const getProfileSlice = createSlice({
    name: 'getProfile',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getProfile.fulfilled, (state, action: PayloadAction<{ name: string, email: string, role: string, _id: string }>) => {
            state.name = action.payload.name
            state.email = action.payload.email
            state.role = action.payload.role
            state.id = action.payload._id
            state.error.message = null
            state.error.status = null
        }),
        builder.addCase(getProfile.rejected, (state, action: PayloadAction<{ message: string, status: number }>) => {
            state.error.message = action.payload.message
            state.error.status = action.payload.status
        })
    },
})
export default getProfileSlice.reducer