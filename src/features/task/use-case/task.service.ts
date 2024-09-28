import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from '../core/dto/create-task.dto';
import { UpdateTaskDto } from '../core/dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/database/core/entities';
import { Repository } from 'typeorm';
import { LoggerService } from 'src/settings/logger';
import { TaskStatusEnum } from 'src/database/core/enum';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private logger: LoggerService,
  ) {}
  async create(createTaskDto: CreateTaskDto) {
    try {
      const deadlineDate = new Date(createTaskDto.deadline);

      const task = this.taskRepository.create({
        status: TaskStatusEnum.PENDIENTE,
        deadline: deadlineDate,
        ...createTaskDto,
      });

      return await this.taskRepository.save(task);
    } catch (error) {
      this.logger.error(TaskService.name, error);
      throw error;
    }
  }

  async findAll() {
    try {
      const tasks = await this.taskRepository.find({
        where: { is_deleted: false },
      });

      return tasks;
    } catch (error) {
      this.logger.error(TaskService.name, error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const task = await this.taskRepository.findOne({
        where: { id },
      });
      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found.`);
      }

      return task;
    } catch (error) {
      this.logger.error(TaskService.name, error);
      throw error;
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    try {
      const task = await this.taskRepository.findOneOrFail({
        where: { id },
      });

      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found.`);
      }

      return await this.taskRepository.update(task.id, updateTaskDto);
    } catch (error) {
      this.logger.error(TaskService.name, error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const task = await this.taskRepository.findOneOrFail({
        where: { id },
      });

      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found.`);
      }

      return await this.taskRepository.update(task.id, {
        deleted_at: new Date(),
        is_deleted: true,
      });
    } catch (error) {
      this.logger.error(TaskService.name, error);
      throw error;
    }
  }
}
