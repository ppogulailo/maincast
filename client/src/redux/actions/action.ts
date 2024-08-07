import { AnyAction } from '@reduxjs/toolkit'
import { PendingAction } from '@/redux'

export const isError = (action: AnyAction): boolean => action.type.endsWith('/rejected')

export const isPendingAction = (action: AnyAction): action is PendingAction => action.type.endsWith('/pending')
