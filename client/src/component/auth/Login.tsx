import {
    Link,
    // useNavigate
} from 'react-router-dom'
// import { useAppDispatch } from '../../redux'
import { useForm } from 'react-hook-form'
import { emailValidation, passwordValidation } from '@/config/validation/validation.ts'
import { useAppDispatch } from '@/redux'
import { signIn } from '@/redux/thunks/auth.thunk.ts'

interface IFormInputs {
    email: string
    password: string
}

export const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInputs>()
    const dispatch = useAppDispatch()
    // const navigate = useNavigate()
    const Login = async (form: IFormInputs) => {
        console.log(form)
        await dispatch(signIn({ email: form.email, password: form.password }))
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <form onSubmit={handleSubmit(Login)} className="space-y-6">
                    <div className="text-2xl font-bold text-center mb-4">Log in</div>
                    <div>
                        <input
                            {...register('email', emailValidation)}
                            placeholder="Email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="text-red-500 text-base mt-1">{errors.email?.message}</div>
                    </div>
                    <div>
                        <input
                            {...register('password', passwordValidation)}
                            placeholder="Password"
                            type="password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="text-red-500 text-sm mt-1">{errors.password?.message}</div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
                        >
                            Continue
                        </button>
                    </div>
                    <div className="text-center mt-4">
                        <Link to="/register" className="text-blue-500 hover:underline">
                            Don't have an account? Sign up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
