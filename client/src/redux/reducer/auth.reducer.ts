import { createSlice, isFulfilled, PayloadAction } from '@reduxjs/toolkit'
import { isError, isPendingAction } from '@/redux/actions/action.ts'
import { logout, signIn, signUp } from '@/redux/thunks/auth.thunk.ts'
import { IAuthState } from '@/interfaces/auth.interfaces.ts'

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
            .addCase(signUp.fulfilled, () => {
                localStorage.setItem('isAuth', '_')
            })
            .addCase(signIn.fulfilled, () => {
                localStorage.setItem('isAuth', '_')
            })
            .addCase(logout.fulfilled, () => {
                localStorage.removeItem('isAuth')
            })
            .addMatcher(isError, (state, { payload }: PayloadAction<{ message: string }>) => {
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
