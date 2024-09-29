import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskPriorityDto } from '../core/dto/create-task-priority.dto';
import { UpdateTaskPriorityDto } from '../core/dto/update-task-priority.dto';
import { Task, TaskPriority } from 'src/database/core/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoggerService } from 'src/settings/logger';

@Injectable()
export class TaskPriorityService {
  constructor(
    @InjectRepository(TaskPriority)
    private taskPriorityRepository: Repository<TaskPriority>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,

    private logger: LoggerService,
  ) {}
  async create({ taskId, ...createTaskPriorityDto }: CreateTaskPriorityDto) {
    try {
      const task = await this.taskRepository.findOne({ where: { id: taskId } });

      if (!task) {
        throw new NotFoundException(`Task with ID ${taskId} not found.`);
      }

      const taskPriority = this.taskPriorityRepository.create({
        ...createTaskPriorityDto,
        task,
      });

      return await this.taskPriorityRepository.save(taskPriority);
    } catch (error) {
      this.logger.error(TaskPriorityService.name, error);
      throw new Error('Error creating task priority');
    }
  }

  async findAll() {
    try {
      const priorities = await this.taskPriorityRepository.find({
        where: { is_deleted: false },
      });

      return priorities;
    } catch (error) {
      this.logger.error(TaskPriorityService.name, error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const priority = await this.taskPriorityRepository.findOne({
        where: { id },
      });
      if (!priority) {
        throw new NotFoundException(`Priority with ID ${id} not found.`);
      }

      return priority;
    } catch (error) {
      this.logger.error(TaskPriorityService.name, error);
      throw error;
    }
  }

  async update(id: string, updateTaskPriorityDto: UpdateTaskPriorityDto) {
    try {
      const priority = await this.taskPriorityRepository.findOneOrFail({
        where: { id },
      });

      if (!priority) {
        throw new NotFoundException(`Priority with ID ${id} not found.`);
      }

      return await this.taskPriorityRepository.update(
        priority.id,
        updateTaskPriorityDto,
      );
    } catch (error) {
      this.logger.error(TaskPriorityService.name, error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const priority = await this.taskPriorityRepository.findOneOrFail({
        where: { id },
      });

      if (!priority) {
        throw new NotFoundException(`Priority with ID ${id} not found.`);
      }

      return await this.taskPriorityRepository.update(priority.id, {
        deleted_at: new Date(),
        is_deleted: true,
      });
    } catch (error) {
      this.logger.error(TaskPriorityService.name, error);
      throw error;
    }
  }
}
