import { createAsyncThunk } from '@reduxjs/toolkit'
import { TaskApi } from '@/api/task.api.ts'

interface ResponseError {
    response?: {
        data: string
    }
}

export const createTask = createAsyncThunk<any, string, { rejectValue: string }>(
    'task/create',
    async (text, { rejectWithValue }) => {
        try {
            const response = await TaskApi.create({ text })
            return response.data
        } catch (e) {
            const error = e as ResponseError
            return rejectWithValue(error.response?.data || 'Unknown error')
        }
    },
)

export const deleteTask = createAsyncThunk<any, { id: number }, { rejectValue: string }>(
    'task/delete',
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await TaskApi.delete(id)
            return response.data
        } catch (e) {
            const error = e as ResponseError
            return rejectWithValue(error.response?.data || 'Unknown error')
        }
    },
)
export const updateTask = createAsyncThunk<any, { id: number; status: string }, { rejectValue: string }>(
    'task/update',
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const response = await TaskApi.update(id, { status })
            return response.data
        } catch (e) {
            const error = e as ResponseError
            return rejectWithValue(error.response?.data || 'Unknown error')
        }
    },
)
export const getTasks = createAsyncThunk<any, {}, { rejectValue: string }>(
    'task/get',
    async (_, { rejectWithValue }) => {
        try {
            const response = await TaskApi.getAll()
            return response.data
        } catch (e) {
            const error = e as ResponseError
            return rejectWithValue(error.response?.data || 'Unknown error')
        }
    },
)
