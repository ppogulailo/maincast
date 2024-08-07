import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { TaskEntity } from './task.entity'
import { CreateTaskDto } from './dto/create-task.dto'
import { TASK_NOT_FOUND } from './task.contstant'
import { FilterTask } from './dto/filter-task'

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,
    ) {}

    async createTask(createUserInput: CreateTaskDto): Promise<TaskEntity> {
        return await this.taskRepository.save({ ...createUserInput })
    }
    async getOneTask(id: number): Promise<TaskEntity> {
        return await this.taskRepository.findOne({ where: { id: id } })
    }
    async getAllTasks({ status }: FilterTask): Promise<TaskEntity[]> {
        return await this.taskRepository.find({ where: { status }, order: { createdAt: 'ASC' } })
    }
    async removeTask(id: number): Promise<number> {
        const task = await this.taskRepository.findOne({ where: { id } })
        if (!task) {
            throw new NotFoundException(TASK_NOT_FOUND)
        }
        await this.taskRepository.delete({ id })
        return id
    }
    async updateTask(id: number, updateUserInput: Partial<TaskEntity>): Promise<TaskEntity> {
        const task = await this.taskRepository.findOne({ where: { id } })
        if (!task) {
            throw new NotFoundException(TASK_NOT_FOUND)
        }
        await this.taskRepository.update({ id }, { ...updateUserInput })
        return await this.getOneTask(id)
    }
}
