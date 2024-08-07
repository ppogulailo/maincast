import axios from 'axios'

export const $api = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
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
                localStorage.removeItem('isAuth')
                console.log('User not autorized')
            }
        }
        if (error?.response?.status == 401) {
            window.location.href = '/login'
        }
        throw error
    },
)
