import { createAsyncThunk } from '@reduxjs/toolkit'
import { TaskApi } from '@/api/task.api.ts'
import { ITask, TaskStatus } from '@/interfaces/task.interfaces.ts'
import { ResponseError } from '@/interfaces/response-error.interfaces.ts'
import { IRejectedValue } from '@/interfaces/thunk.interfaces.ts'

export const createTask = createAsyncThunk<ITask, string, IRejectedValue>(
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

export const deleteTask = createAsyncThunk<number, Pick<ITask, 'id'>, IRejectedValue>(
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
export const updateTask = createAsyncThunk<ITask, Omit<ITask, 'text'>, IRejectedValue>(
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
export const getTasks = createAsyncThunk<ITask[], TaskStatus | undefined, IRejectedValue>(
    'task/get',
    async (status, { rejectWithValue }) => {
        try {
            const response = await TaskApi.getAll(status)
            return response.data
        } catch (e) {
            const error = e as ResponseError
            return rejectWithValue(error.response?.data || 'Unknown error')
        }
    },
)
