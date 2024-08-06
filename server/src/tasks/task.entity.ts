import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
export enum TaskStatus {
  DONE = 'done',
  PROCESS = 'process',
  BACKLOG = 'backlog',
  NONE = 'none',
}
@Entity('task')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  text: string;
  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.NONE,
  })
  status: TaskStatus;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
