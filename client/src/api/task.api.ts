import { $api } from '../config/axios'
import { AxiosResponse } from 'axios'
export interface ITask {
    text: string
    id: number
    status: string
}
export interface ITaskCreate {
    text: string
}
export const TaskApi = {
    create: (body: ITaskCreate): Promise<AxiosResponse<ITask>> => {
        return $api.post(`/tasks`, body)
    },
    getAll: () => {
        return $api.get(`/tasks`)
    },
    update: (id: number, body: { status: string }): Promise<AxiosResponse<string>> => {
        console.log(body)
        return $api.patch(`/tasks/${id}`, body)
    },
    delete: (id: number) => {
        return $api.delete(`/tasks/${id}`)
    },
}
