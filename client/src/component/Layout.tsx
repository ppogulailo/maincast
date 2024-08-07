import { Link, Outlet, useNavigate } from 'react-router-dom'
import { logout } from '@/redux/thunks/auth.thunk.ts'
import { useAppDispatch } from '@/redux'

const Layout = (): JSX.Element => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <>
            <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
                <Link className="text-2xl font-bold" to="/">
                    Maincast Test App
                </Link>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Logout
                </button>
            </header>
            <div className="min-h-screen">
                <Outlet />
            </div>
            <footer className="bg-gray-800 text-white p-4 flex justify-center items-center">
                <p className="text-center">&copy; 2024 Maincast. All rights reserved.</p>
            </footer>
        </>
    )
}
export default Layout
