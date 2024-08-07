import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTypeSelector } from '@/hooks/useTypeSelector.ts'
import { IReactChildren } from '@/interfaces/react.interfaces.ts'

export const RequireAuth: FC<IReactChildren> = ({ children }) => {
    const navigate = useNavigate()
    const isAuth = useTypeSelector(state => state.auth.isAuth)
    useEffect(() => {
        if (!isAuth) {
            navigate('/login')
        }
    }, [isAuth])

    return <>{children}</>
}
