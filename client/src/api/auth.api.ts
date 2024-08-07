import { $api } from '../config/axios'
import { AxiosResponse } from 'axios'
export interface IRegister {
    email: string
    password: string
    name: string
}

export interface ILogin {
    email: string
    password: string
}

export interface AuthResponse {
    jwt: string
    id: string
}
export const AuthApi = {
    register: (body: IRegister): Promise<AxiosResponse<AuthResponse>> => {
        return $api.post(`/auth/signup`, body)
    },
    login: (body: ILogin): Promise<AxiosResponse<AuthResponse>> => {
        return $api.post(`/auth/signin`, body)
    },
    checkAuth: (): Promise<AxiosResponse<string>> => {
        return $api.get(`/auth/refresh`, { withCredentials: true })
    },
    logOut: () => {
        return $api.get(`/auth/logout`, { withCredentials: true })
    },
}
