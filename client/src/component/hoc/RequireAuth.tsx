import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IReactChildren } from '@/interfaces/react.interfaces.ts'

export const RequireAuth: FC<IReactChildren> = ({ children }) => {
    const navigate = useNavigate()
    const isAuth = localStorage.getItem('isAuth')

    useEffect(() => {
        if (!isAuth) {
            navigate('/login')
        }
    }, [isAuth, navigate])

    return <>{children}</>
}
