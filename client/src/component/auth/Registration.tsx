import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { emailValidation, passwordValidation } from '@/config/validation/validation.ts'
import { useAppDispatch } from '@/redux'
import { signUp } from '@/redux/thunks/auth.thunk.ts'
import { IRegister } from '@/interfaces/auth.interfaces.ts'

export const Registration = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IRegister>()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleSignUp = async ({ email, name, password }: IRegister) => {
        await dispatch(signUp({ email, password, name }))
        if (localStorage.getItem('isAuth')) {
            navigate('/')
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <form onSubmit={handleSubmit(handleSignUp)} className="space-y-6">
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
