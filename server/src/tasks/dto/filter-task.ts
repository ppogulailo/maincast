import { IsEnum, IsOptional } from 'class-validator'
import { TaskStatus } from '../task.entity'
export class FilterTask {
    @IsOptional()
    @IsEnum(TaskStatus)
    status: TaskStatus
}
