import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { TaskService } from './task.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { TaskEntity } from './task.entity'
import { UpdateTaskDto } from './dto/update-task.dto'
import { FilterTask } from './dto/filter-task'
import { IdValidationPipe } from '../pipes/id-validation-pipe'

@Controller('tasks')
export class TaskController {
    constructor(private taskService: TaskService) {}

    @Get()
    async allTasks(@Query() query: FilterTask) {
        return this.taskService.getAllTasks(query)
    }
    @Post()
    async createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskEntity> {
        return this.taskService.createTask(createTaskDto)
    }
    @Patch(':id')
    async updateTask(
        @Param('id', IdValidationPipe) id: number,
        @Body() updateTaskDto: UpdateTaskDto,
    ): Promise<TaskEntity> {
        return this.taskService.updateTask(id, updateTaskDto)
    }
    @Delete(':id')
    async removeTask(@Param('id', IdValidationPipe) id: number): Promise<number> {
        return this.taskService.removeTask(id)
    }
}
