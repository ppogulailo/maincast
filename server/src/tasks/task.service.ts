import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskEntity } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async createTask(createUserInput: CreateTaskDto): Promise<TaskEntity> {
    return await this.taskRepository.save({ ...createUserInput });
  }
  async getOneTask(id: number): Promise<TaskEntity> {
    return await this.taskRepository.findOne({ where: { id: id } });
  }
  async getAllTasks(): Promise<TaskEntity[]> {
    return await this.taskRepository.find();
  }
  async removeTask(id: number): Promise<number> {
    await this.taskRepository.delete({ id });
    return id;
  }
  async updateTask(updateUserInput: Partial<TaskEntity>): Promise<TaskEntity> {
    await this.taskRepository.update(
      { id: updateUserInput.id },
      { ...updateUserInput },
    );
    return await this.getOneTask(updateUserInput.id);
  }
}
