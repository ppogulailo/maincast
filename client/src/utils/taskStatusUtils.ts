import { TaskStatus } from '@/interfaces/task.interfaces'

export const getStatusClass = (status: TaskStatus): string => {
    switch (status) {
        case TaskStatus.DONE:
            return 'bg-green-200'
        case TaskStatus.PROCESS:
            return 'bg-yellow-200'
        case TaskStatus.BACKLOG:
            return 'bg-red-200'
        case TaskStatus.NONE:
        default:
            return 'bg-gray-200'
    }
}
