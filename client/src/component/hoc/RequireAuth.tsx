import { useNavigate } from 'react-router-dom'
import { FC, ReactNode, useEffect } from 'react'
interface ReactChildren {
    children: ReactNode
}

export const RequireAuth: FC<ReactChildren> = ({ children }) => {
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('isAuth')) {
            navigate('/login')
        }
    }, [])

    return <>{children}</>
}
