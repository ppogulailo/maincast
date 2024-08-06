import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskEntity } from './task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  async allTasks() {
    return this.taskService.getAllTasks();
  }
  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.taskService.createTask(createTaskDto);
  }
  @Patch(':id')
  async updateTask(@Body() updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
    return this.taskService.updateTask(updateTaskDto);
  }
  @Delete(':id')
  async removeTask(@Body('id') id: number): Promise<number> {
    return this.taskService.removeTask(id);
  }
}
