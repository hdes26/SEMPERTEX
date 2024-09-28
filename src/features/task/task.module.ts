import { Module } from '@nestjs/common';
import { TaskService } from './use-case/task.service';
import { TaskController } from './task.controller';
import { LoggerModule } from 'src/settings/logger';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/database/core/entities';

@Module({
  imports: [LoggerModule, TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
