import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";

const initialState: {

    username: string | null,
    email: string | null,
    error: {
        message: string | null,
        status: number | null
    }
    isLogged: boolean
} = {

    username: null,
    email: null,
    error: {
        message: null,
        status: null
    },
    isLogged: false
}

export const userLogin = createAsyncThunk('userLogin', async function (data: { email: string; password: string }, { rejectWithValue }) {
    try {
        const res = await axios.post('http://localhost:3001/auth/login', data)
        return res.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue({
                message: error.response?.data.error,
                status: error.response?.data.status,
            });
        } else {
            return rejectWithValue({ message: 'An unknown error occurred', status: 500 });
        }
    }
})

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        clearUserData: (state) => {
            localStorage.removeItem('token')
            state.email = null,
                state.username = null,
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
            builder.addCase(userLogin.rejected, (state, action: PayloadAction<{ message: string, status: number }>) => {
                console.log('rejected', action.payload);
                state.error.message = action.payload.message
                state.error.status = action.payload.status
            })
    },

})
export default loginSlice.reducer
export const { clearUserData } = loginSlice.actions