import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { useForm } from 'react-hook-form'
import { useAppDispatch } from '@/redux'
import { useTypeSelector } from '@/hooks/useTypeSelector.ts'
import { createTask, deleteTask, getTasks, updateTask } from '@/redux/thunks/task.thunk.ts'
import { ITaskCreate, TaskStatus } from '@/interfaces/task.interfaces.ts'
import { getStatusClass } from '@/utils/taskStatusUtils.ts'
import { useSearchParams } from 'react-router-dom'

Modal.setAppElement('#root')

const TaskPage: React.FC = () => {
    const tasks = useTypeSelector(state => state.tasks.tasks)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ITaskCreate>()
    const dispatch = useAppDispatch()

    const fetchTasks = async (status?: TaskStatus) => {
        await dispatch(getTasks(status))
    }
    const handleCreateTask = async ({ text }: { text: string }) => {
        dispatch(createTask(text))
        setModalIsOpen(false)
    }
    const handleUpdateTask = async (id: number, status: string) => {
        dispatch(updateTask({ id, status }))
    }
    const handleDeleteTask = async (id: number) => {
        dispatch(deleteTask({ id }))
    }
    const handleStatusFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const status = event.target.value as TaskStatus
        setSearchParams(status ? { status } : {})
        fetchTasks(status)
    }

    useEffect(() => {
        fetchTasks(searchParams.get('status') as TaskStatus)
    }, [])
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Tasks</h1>
            <button className="bg-blue-500 text-white p-2 rounded mb-4" onClick={() => setModalIsOpen(true)}>
                Create Task
            </button>
            <select
                value={searchParams.get('status') || ''}
                onChange={handleStatusFilterChange}
                className="p-2 border rounded"
            >
                <option value="">All</option>
                {Object.values(TaskStatus).map(status => (
                    <option key={status} value={status}>
                        {status}
                    </option>
                ))}
            </select>
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
