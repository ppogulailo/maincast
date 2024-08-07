import { createSlice, isFulfilled } from '@reduxjs/toolkit'
import { isError, isPendingAction } from '@/redux/actions/action.ts'
// import { checkAuth, logout, signIn, signUp } from '@/redux/thunks/auth.thunk.ts'
export interface IAuthState {
    error: string | null
    isLoading: boolean | null
    isAuth: boolean | null
    id: string | null
}
const initialState: IAuthState = {
    isAuth: null,
    isLoading: null,
    error: null,
    id: null,
}
const itemSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addMatcher(isError, (state, { payload }) => {
                state.error = payload.message
                state.isLoading = false
            })
            .addMatcher(isPendingAction, state => {
                state.error = null
                state.isLoading = true
            })
            .addMatcher(isFulfilled, state => {
                state.isAuth = true
                state.isLoading = false
            })
    },
})

// export const {changeSearch, changeDataStart, changeDataEnd} = itemSlice.actions;

export default itemSlice.reducer
