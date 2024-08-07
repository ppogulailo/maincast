import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { useForm } from 'react-hook-form'
import { useAppDispatch } from '@/redux'
import { useTypeSelector } from '@/hooks/useTypeSelector.ts'
import { createTask, deleteTask, getTasks, updateTask } from '@/redux/thunks/task.thunk.ts'

Modal.setAppElement('#root') // Установка головного елемента для доступності модальних вікон

interface IFormInputs {
    text: string
}

const TaskPage: React.FC = () => {
    const tasks = useTypeSelector(state => state.tasks.tasks)
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInputs>()
    const dispatch = useAppDispatch()

    const fetchTasks = async () => {
        try {
            await dispatch(getTasks({}))
        } catch (error) {
            console.error('Failed to fetch tasks', error)
        }
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    const handleCreateTask = async ({ text }: { text: string }) => {
        try {
            dispatch(createTask(text))
            setModalIsOpen(false)
        } catch (error) {
            console.error('Failed to create task', error)
        }
    }

    const handleUpdateTask = async (id: number, status: string) => {
        try {
            console.log(id, status)
            dispatch(updateTask({ id, status }))
        } catch (error) {
            console.error('Failed to update task', error)
        }
    }

    const handleDeleteTask = async (id: number) => {
        try {
            dispatch(deleteTask({ id }))
        } catch (error) {
            console.error('Failed to delete task', error)
        }
    }
    enum TaskStatus {
        DONE = 'done',
        PROCESS = 'process',
        BACKLOG = 'backlog',
        NONE = 'none',
    }
    const getStatusClass = (status: TaskStatus) => {
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
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Tasks</h1>
            <button className="bg-blue-500 text-white p-2 rounded mb-4" onClick={() => setModalIsOpen(true)}>
                Create Task
            </button>
            <ul className="space-y-2">
                {tasks.map(task => (
                    <li
                        key={task.id}
                        className={`p-4 border rounded flex justify-between items-center ${getStatusClass(task.status as TaskStatus)}`}
                    >
                        <span>{task.text}</span>
                        <div className="flex items-center">
                            <select
                                value={task.status}
                                onChange={e => handleUpdateTask(task.id, e.target.value as TaskStatus)}
                                className="mr-2 p-2 border rounded"
                            >
                                {Object.values(TaskStatus).map(status => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                            <button
                                className="bg-red-500 text-white p-2 rounded"
                                onClick={() => handleDeleteTask(task.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Create Task"
                className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto"
            >
                <form onSubmit={handleSubmit(handleCreateTask)} className="space-y-6">
                    <h2 className="text-xl font-bold mb-4">Create Task</h2>
                    <input type="text" className="border p-2 w-full mb-4" {...register('text', { required: true })} />
                    <div className="text-red-500 text-sm mt-1">{errors.text?.message}</div>
                    <button className="bg-blue-500 text-white p-2 rounded w-full" type="submit">
                        Create
                    </button>
                    <button className="mt-2 p-2 text-gray-500" onClick={() => setModalIsOpen(false)}>
                        Cancel
                    </button>
                </form>
            </Modal>
        </div>
    )
}

export { TaskPage }
