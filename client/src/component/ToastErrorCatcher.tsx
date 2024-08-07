import { useTypeSelector } from '@/hooks/useTypeSelector'
import { Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

export const ErrorNotifier = () => {
    const authErrors = useTypeSelector(state => state.auth.error)

    useEffect(() => {
        if (authErrors) {
            toast.error(authErrors)
        }
    }, [authErrors])

    return <Outlet />
}
