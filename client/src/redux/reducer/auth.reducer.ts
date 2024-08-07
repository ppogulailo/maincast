import { createSlice, isFulfilled } from '@reduxjs/toolkit'
import { isError, isPendingAction } from '@/redux/actions/action.ts'
import { checkAuth, logout, signIn, signUp } from '@/redux/thunks/auth.thunk.ts'
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
            .addCase(signIn.fulfilled, (state, { payload }) => {
                state.isAuth = true
                localStorage.setItem('authToken', payload.jwt)
                state.id = payload.id
            })
            .addCase(signUp.fulfilled, state => {
                state.isAuth = true
                localStorage.setItem('isAuth', 'true')
                // state.id = payload.id
            })
            .addCase(checkAuth.fulfilled, (state, { payload }) => {
                state.isAuth = true
                localStorage.setItem('authToken', payload)
            })
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            .addCase(logout.fulfilled, () => {})
            .addCase(checkAuth.rejected, state => {
                state.isAuth = false
                localStorage.removeItem('authToken')
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
                state.isAuth = true
                state.isLoading = false
            })
    },
})

// export const {changeSearch, changeDataStart, changeDataEnd} = itemSlice.actions;

export default itemSlice.reducer
