import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios";

interface RejectedPayload {
    message: string
    statusCode: number
}
const initialState: {
    username: string | null,
    email: string | null,
    isLogged : boolean
} = {
    username: null,
    email: null,
    isLogged : false
}

export const userLogin = createAsyncThunk('userLogin', async function (data: { email: string; password: string }, { rejectWithValue }) {
    try {
        const res = await axios.post('http://localhost:3001/auth/login', data)
        return res.data
    } catch (error) {
        const axiosError = error as AxiosError
        return rejectWithValue(
            axiosError.response?.data
        )
    }
})

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        clearUserData: (state) => {
            localStorage.removeItem('token')
            state.email = null,
            state.username = null
            state.isLogged = false
        },
    },
    extraReducers(builder) {
        builder.addCase(userLogin.fulfilled, (state, action: PayloadAction<{ token: string, email: string, name: string }>) => {
            localStorage.setItem('token', action.payload.token)
            state.username = action.payload.name
            state.email = action.payload.email
            state.isLogged = true

        }),
        builder.addCase(userLogin.rejected, (_, action) => {
            throw new Error((action.payload as RejectedPayload).message || 'Unexpected error occurred')
        })
    },

})
export default loginSlice.reducer
export const { clearUserData } = loginSlice.actions