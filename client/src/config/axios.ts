import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

export const $api = axios.create({
    withCredentials: true,
    baseURL: process.env.API_URL,
    headers: { 'Content-Type': 'application/json' },
})
// $api.interceptors.request.use((config: AxiosRequestConfig) => {
//     config.headers = config.headers ?? {}
//     config.headers.Authorization = `Bearer ${localStorage.getItem('authToken')}`
//     return config
// })
$api.interceptors.response.use(
    config => {
        return config
    },
    async error => {
        const originalRequest = error.config
        if (error?.response?.status == 401 && error.config && error.config._isRetry != true) {
            originalRequest._isRetry = true
            try {
                await $api('/auth/refresh')
                return $api.request(originalRequest)
            } catch (e) {
                console.log('User not autorized')
            }
        }
        throw error
    },
)
