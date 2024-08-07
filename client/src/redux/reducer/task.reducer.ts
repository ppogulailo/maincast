import { createSlice, isFulfilled } from '@reduxjs/toolkit'
import { isError, isPendingAction } from '@/redux/actions/action.ts'
import { ITask } from '@/api/task.api.ts'
import { createTask, getTasks, deleteTask, updateTask } from '@/redux/thunks/task.thunk.ts'
interface IAuthState {
    error: string | null
    isLoading: boolean | null
    tasks: ITask[]
    id: number | null
}
const initialState: IAuthState = {
    isLoading: null,
    error: null,
    id: null,
    tasks: [],
}
const itemSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getTasks.fulfilled, (state, { payload }) => {
                state.tasks = payload
            })
            .addCase(deleteTask.fulfilled, (state, { payload }) => {
                state.tasks = state.tasks.filter(task => task.id !== payload)
            })
            .addCase(createTask.fulfilled, (state, { payload }) => {
                state.tasks.push(payload)
            })
            .addCase(updateTask.fulfilled, (state, { payload }) => {
                const index = state.tasks.findIndex(task => task.id === payload.id)
                if (index !== -1) {
                    state.tasks[index] = payload
                }
            })
            .addMatcher(isError, (state, { payload }) => {
                state.error = payload.message
                state.isLoading = false
            })
            .addMatcher(isPendingAction, state => {
                state.error = null
                state.isLoading = true
            })
            .addMatcher(isFulfilled, state => {
                state.isLoading = false
            })
    },
})

// export const {changeSearch, changeDataStart, changeDataEnd} = itemSlice.actions;

export default itemSlice.reducer
