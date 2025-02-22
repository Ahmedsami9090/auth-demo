import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: {
    error: {
        message: string | null,
        status: number | null
    },
    isRegistered: boolean
} = { isRegistered: false, error: { message: null, status: null } }
export const userSignup = createAsyncThunk('signup',
    async function (data: { email: string, password: string, name: string }, { rejectWithValue }) {
        try {
            const res = await axios.post('http://localhost:3001/users/signup', data)
            return res.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue({
                    message: error.response?.data.details || 'failed to get user profile',
                    status: error.response?.data.status || 500
                })
            } else {
                return rejectWithValue({
                    message: 'An unknown error occurred',
                    status: 500
                })
            }
        }
    }
)
const userSignupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userSignup.fulfilled, (state, action) => {
            state.isRegistered = true
        }),
        builder.addCase(userSignup.rejected, (state, action : PayloadAction<{message : string, status : number}>) => {
            state.error.message= action.payload.message
            state.error.status = action.payload.status
            })
    }
})

export default userSignupSlice.reducer