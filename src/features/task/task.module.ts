import { Module } from '@nestjs/common';
import { TaskService } from './use-case/task.service';
import { TaskController } from './task.controller';
import { LoggerModule } from 'src/settings/logger';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member, Task, TaskMember } from 'src/database/core/entities';

@Module({
  imports: [LoggerModule, TypeOrmModule.forFeature([Task, Member, TaskMember])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
