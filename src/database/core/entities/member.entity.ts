import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './shared/base.entity';
import { TaskMember } from './task-member.entity';

@Entity()
export class Member extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  email: string;

  @OneToMany(() => TaskMember, (taskMember) => taskMember.task)
  taskMember: TaskMember[];
}
