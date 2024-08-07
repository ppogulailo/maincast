import { useNavigate } from 'react-router-dom'
import { FC, ReactNode, useEffect } from 'react'
import { useTypeSelector } from '@/hooks/useTypeSelector.ts'
interface ReactChildren {
    children: ReactNode
}

export const RequireAuth: FC<ReactChildren> = ({ children }) => {
    const navigate = useNavigate()
    const isAuth = useTypeSelector(state => state.auth.isAuth)
    useEffect(() => {
        if (!isAuth) {
            navigate('/login')
        }
    }, [])

    return <>{children}</>
}
