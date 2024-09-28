import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from './shared/base.entity';
import { TaskStatusEnum } from '../enum';
import { Project } from './project.entity';
import { TaskPriority } from './task-priority.entity';
import { TaskMember } from './task-member.entity';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column()
  deadline: Date;

  @Column({ enum: TaskStatusEnum })
  status: TaskStatusEnum;

  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;

  @OneToMany(() => TaskPriority, (taskPriorities) => taskPriorities.task)
  taskPriorities: TaskPriority[];

  @OneToMany(() => TaskMember, (taskMember) => taskMember.task)
  taskMember: TaskMember[];
}
