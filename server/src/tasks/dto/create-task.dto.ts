import { IsString } from 'class-validator';
export class CreateTaskDto {
  @IsString()
  text: string;
}
