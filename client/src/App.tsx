import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Login } from '@/component/auth/Login.tsx'
import { Registration } from '@/component/auth/Registration.tsx'
import { RequireAuth } from '@/component/hoc/RequireAuth.tsx'
import { TaskPage } from '@/component/tasks/Tasks.tsx'
import { NotFountPage } from '@/component/NotFound.tsx'
import Layout from '@/component/Layout.tsx'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route element={<Layout />}>
                <Route
                    path="/"
                    element={
                        <RequireAuth>
                            <TaskPage />
                        </RequireAuth>
                    }
                />
            </Route>
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
