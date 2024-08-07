export interface ITask {
    text: string
    id: number
    status: string
}
export interface ITaskCreate {
    text: string
}
export interface ITaskState {
    error: string | null
    isLoading: boolean | null
    tasks: ITask[]
    id: number | null
}

export enum TaskStatus {
    DONE = 'done',
    PROCESS = 'process',
    BACKLOG = 'backlog',
    NONE = 'none',
}
