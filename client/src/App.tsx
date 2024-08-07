import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { NotFountPage } from './component/NotFound.tsx'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="*" element={<NotFountPage />} />
        </Route>,
    ),
)
const App = (): JSX.Element => {
    return <RouterProvider router={router} />
}

export default App
