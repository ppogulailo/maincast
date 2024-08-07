import { $api } from '../config/axios'
import { AxiosResponse } from 'axios'
import { ILogin, IRegister } from '@/interfaces/auth.interfaces.ts'

export const AuthApi = {
    register: (body: IRegister): Promise<AxiosResponse<never>> => {
        return $api.post(`/auth/signup`, body)
    },
    login: (body: ILogin): Promise<AxiosResponse<never>> => {
        return $api.post(`/auth/signin`, body)
    },
    checkAuth: (): Promise<AxiosResponse<never>> => {
        return $api.get(`/auth/refresh`)
    },
    logOut: () => {
        return $api.get(`/auth/logout`)
    },
}
