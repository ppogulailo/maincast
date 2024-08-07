import { IsString, IsEnum, IsOptional, IsNotEmpty } from 'class-validator'
import { TaskStatus } from '../task.entity'
export class UpdateTaskDto {
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    text: string
    @IsEnum(TaskStatus)
    status: TaskStatus
}
