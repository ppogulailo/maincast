export interface IRegister {
    email: string
    password: string
    name: string
}

export interface ILogin {
    email: string
    password: string
}

export interface IAuthState {
    error: string | null
    isLoading: boolean | null
    isAuth: boolean | null
    id: string | null
}
