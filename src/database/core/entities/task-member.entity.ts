import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './shared/base.entity';
import { Task } from './task.entity';
import { Member } from './member.entity';

@Entity()
export class TaskMember extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Task, (task) => task.taskMember)
  task: Task;

  @ManyToOne(() => Member, (member) => member.taskMember)
  member: Member;
}
