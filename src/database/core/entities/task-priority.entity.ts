import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './shared/base.entity';
import { Task } from './task.entity';

@Entity()
export class TaskPriority extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column()
  check: boolean;

  @ManyToOne(() => Task, (task) => task.taskPriorities)
  task: Task;
}
