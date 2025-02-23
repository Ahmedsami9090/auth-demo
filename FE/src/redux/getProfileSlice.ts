import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface RejectedPayload {
    message: string
    statusCode: number
  }
const initialState: {
    name: string | null,
    email: string | null,
    role: string | null,
    id: string | null, 
} = {
    name: null,
    email: null,
    role: null,
    id: null,
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
        const axiosError = error as AxiosError
        return rejectWithValue(axiosError)
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
        }),
        builder.addCase(getProfile.rejected, (_, action) => {
            throw new Error((action.payload as RejectedPayload).message)
        })
    },
})
export default getProfileSlice.reducer