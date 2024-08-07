import { Link } from 'react-router-dom'

const NotFountPage = (): JSX.Element => (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <p className="text-2xl text-gray-600">Page Not Found</p>
        <Link to="/" className="mt-4 text-blue-500 hover:underline">
            Go back to Home
        </Link>
    </div>
)

export { NotFountPage }
