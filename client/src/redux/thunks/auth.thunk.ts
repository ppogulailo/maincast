import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthApi, AuthResponse } from '@/api/auth.api.ts'

interface ResponseError {
    response?: {
        data: string
    }
}

export const signUp = createAsyncThunk<
    AuthResponse,
    { email: string; password: string; name: string },
    { rejectValue: string }
>('auth/register', async (body, { rejectWithValue }) => {
    try {
        const response = await AuthApi.register(body)
        console.log(response.data)
        return response.data
    } catch (e) {
        const error = e as ResponseError
        return rejectWithValue(error.response?.data || 'Unknown error')
    }
})

export const signIn = createAsyncThunk<AuthResponse, { email: string; password: string }, { rejectValue: string }>(
    'auth/login',
    async (body, { rejectWithValue }) => {
        try {
            const response = await AuthApi.login(body)
            return response.data
        } catch (e) {
            const error = e as ResponseError
            return rejectWithValue(error.response?.data || 'Unknown error')
        }
    },
)

export const checkAuth = createAsyncThunk<string, undefined, { rejectValue: string }>(
    'auth/check',
    async (_, { rejectWithValue }) => {
        try {
            const response = await AuthApi.checkAuth()
            return response.data
        } catch (e) {
            const error = e as ResponseError
            return rejectWithValue(error.response?.data || 'Unknown error')
        }
    },
)

export const logout = createAsyncThunk<void, undefined, { rejectValue: string }>(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await AuthApi.logOut()
            return response.data
        } catch (e) {
            const error = e as ResponseError
            return rejectWithValue(error.response?.data || 'Unknown error')
        }
    },
)
