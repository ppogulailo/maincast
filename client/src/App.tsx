import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { Login } from '@/component/auth/Login.tsx'
import { Registration } from '@/component/auth/Registration.tsx'
import { RequireAuth } from '@/component/hoc/RequireAuth.tsx'
import { TaskPage } from '@/component/tasks/Tasks.tsx'
import { NotFountPage } from '@/component/NotFound.tsx'
import Layout from '@/component/Layout.tsx'
import { ErrorNotifier } from '@/component/ToastErrorCatcher.tsx'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<ErrorNotifier />}>
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
const App = () => {
    return (
        <>
            <RouterProvider router={router} />
            <ToastContainer />
        </>
    )
}

export default App
