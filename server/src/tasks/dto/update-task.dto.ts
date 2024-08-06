import { IsString, IsEnum } from 'class-validator';
import { TaskStatus } from '../task.entity';
export class UpdateTaskDto {
  @IsString()
  text: string;
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
