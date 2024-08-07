import { configureStore, combineReducers, AsyncThunk } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import authReducer from '@/redux/reducer/auth.reducer'
import taskReducer from '@/redux/reducer/task.reducer'

const rootReducer = combineReducers({
    auth: authReducer,
    tasks: taskReducer,
})

const store = configureStore({
    reducer: rootReducer,
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>
export type PendingAction = ReturnType<GenericAsyncThunk['pending']>

export const useAppDispatch = () => useDispatch<AppDispatch>()
