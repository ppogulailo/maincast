import { AxiosResponse } from 'axios'
import { $api } from '../config/axios'
import { ITask, ITaskCreate } from '@/interfaces/task.interfaces.ts'

export const TaskApi = {
    create: (body: ITaskCreate): Promise<AxiosResponse<ITask>> => {
        return $api.post(`/tasks`, body)
    },
    getAll: (): Promise<AxiosResponse<ITask[]>> => {
        return $api.get(`/tasks`)
    },
    update: (id: number, body: Pick<ITask, 'status'>): Promise<AxiosResponse<ITask>> => {
        console.log(body)
        return $api.patch(`/tasks/${id}`, body)
    },
    delete: (id: number): Promise<AxiosResponse<number>> => {
        return $api.delete(`/tasks/${id}`)
    },
}
