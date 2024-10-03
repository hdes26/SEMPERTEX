import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from '../core/dto/create-task.dto';
import { UpdateTaskDto } from '../core/dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Member, Project, Task, TaskMember } from 'src/database/core/entities';
import { Repository } from 'typeorm';
import { LoggerService } from 'src/settings/logger';
import { FindTasksDto } from '../core/dto/find-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(TaskMember)
    private readonly taskMemberRepository: Repository<TaskMember>,
    private readonly logger: LoggerService,
  ) {}
  async create({ projectId, ...createTaskDto }: CreateTaskDto) {
    try {
      const project = await this.projectRepository.findOne({
        where: { id: projectId },
      });

      if (!project) {
        throw new NotFoundException(`Project with ID ${projectId} not found.`);
      }
      const deadlineDate = new Date(createTaskDto.deadline);

      const task = this.taskRepository.create({
        deadline: deadlineDate,
        project,
        ...createTaskDto,
      });

      return await this.taskRepository.save(task);
    } catch (error) {
      this.logger.error(TaskService.name, error);
      throw error;
    }
  }

  async assign(id: string, memberId: string) {
    try {
      const [task, member] = await Promise.all([
        this.taskRepository.findOneOrFail({ where: { id } }),
        this.memberRepository.findOneOrFail({ where: { id: memberId } }),
      ]);

      const assign = this.taskMemberRepository.create({ task, member });

      return await this.taskMemberRepository.save(assign);
    } catch (error) {
      this.logger.error(
        `Error assigning member ${memberId} to task ${id}:`,
        error.message || error,
      );
      throw error;
    }
  }

  async unassign(id: string, memberId: string) {
    try {
      const assignment = await this.taskMemberRepository.findOne({
        where: {
          task: { id },
          member: { id: memberId },
        },
      });

      if (!assignment) {
        throw new NotFoundException(
          `Assignment not found for task ${id} and member ${memberId}.`,
        );
      }

      await this.taskMemberRepository.remove(assignment);
      return {
        message: `Member ${memberId} successfully unassigned from task ${id}.`,
      };
    } catch (error) {
      this.logger.error(
        `Error unassigning member ${memberId} from task ${id}:`,
        error.message || error,
      );
      throw error;
    }
  }

  async findAll(query: FindTasksDto) {
    try {
      if (query.projectId) {
        const project = await this.projectRepository.findOne({
          where: { id: query.projectId },
        });
        if (!project) {
          throw new NotFoundException(
            `Project with ID ${query.projectId} not found.`,
          );
        }

        return await this.taskRepository.find({
          where: { project: { id: project.id } },
        });
      }

      const tasks = await this.taskRepository.find({
        where: { is_deleted: false },
      });

      return tasks;
    } catch (error) {
      this.logger.error(TaskService.name, error);
      throw error;
    }
  }

  async membersAssigned(id: string) {
    try {
      const task = await this.taskRepository.findOne({
        where: { id },
      });
      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found.`);
      }
      const members = await this.taskMemberRepository.find({
        relations: ['member'],
        where: { task: { id: id } },
        select: { member: { id: true, name: true } },
      });

      return members;
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
