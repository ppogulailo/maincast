import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { NotFountPage } from './component/NotFound.tsx'
import { Login } from './component/auth/Login.tsx'
import { Registration } from './component/auth/Registration.tsx'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="*" element={<NotFountPage />} />
        </Route>,
    ),
)
const App = (): JSX.Element => {
    return <RouterProvider router={router} />
}

export default App
