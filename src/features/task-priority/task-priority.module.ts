import { Module } from '@nestjs/common';
import { TaskPriorityService } from './use-case/task-priority.service';
import { TaskPriorityController } from './task-priority.controller';
import { LoggerModule } from 'src/settings/logger';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task, TaskPriority } from 'src/database/core/entities';

@Module({
  imports: [LoggerModule, TypeOrmModule.forFeature([TaskPriority, Task])],
  controllers: [TaskPriorityController],
  providers: [TaskPriorityService],
})
export class TaskPriorityModule {}
