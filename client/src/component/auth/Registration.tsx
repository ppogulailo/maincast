import { useForm } from 'react-hook-form'
import {
    Link,
    // useNavigate
} from 'react-router-dom'
import { emailValidation, passwordValidation } from '../../config/validation/validation.ts'

interface IFormInputs {
    name: string
    email: string
    password: string
}
export const Registration = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInputs>()
    // const dispatch = useAppDispatch()
    // const navigate = useNavigate()
    const Register = async () =>
        // { email, name, password }: IFormInputs
        {
            // await dispatch(signup({ email, password, name }))
            // if (localStorage.getItem('authToken')) {
            //     navigate('/')
            // }
        }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <form onSubmit={handleSubmit(Register)} className="space-y-6">
                    <div className="text-2xl font-bold text-center mb-4">Sign up</div>
                    <div>
                        <input
                            {...register('name', { required: true })}
                            placeholder="Name"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.name?.message && <div className="text-red-500 text-sm mt-1">{errors.name.message}</div>}
                    </div>
                    <div>
                        <input
                            {...register('email', emailValidation)}
                            placeholder="Email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email?.message && (
                            <div className="text-red-500 text-sm mt-1">{errors.email.message}</div>
                        )}
                    </div>
                    <div>
                        <input
                            {...register('password', passwordValidation)}
                            placeholder="Password"
                            type="password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password?.message && (
                            <div className="text-red-500 text-sm mt-1">{errors.password.message}</div>
                        )}
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
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Already have an account? Log in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
