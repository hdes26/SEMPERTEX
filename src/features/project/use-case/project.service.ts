import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from '../core/dto/create-project.dto';
import { UpdateProjectDto } from '../core/dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/database/core/entities';
import { Repository } from 'typeorm';
import { LoggerService } from 'src/settings/logger';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    private logger: LoggerService,
  ) {}
  async create(createProjectDto: CreateProjectDto) {
    try {
      return await this.projectRepository.save(createProjectDto);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findAll() {
    try {
      const projects = await this.projectRepository.find({
        where: { is_deleted: false },
      });

      return projects;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const project = await this.projectRepository.findOne({
        where: { id },
      });
      if (!project) {
        throw new NotFoundException(`Project with ID ${id} not found.`);
      }

      return project;
    } catch (error) {
      this.logger.error(ProjectService.name, error);
      throw error;
    }
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    try {
      const project = await this.projectRepository.findOneOrFail({
        where: { id },
      });

      if (!project) {
        throw new NotFoundException(`Project with ID ${id} not found.`);
      }

      return await this.projectRepository.update(project.id, updateProjectDto);
    } catch (error) {
      this.logger.error(ProjectService.name, error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const project = await this.projectRepository.findOneOrFail({
        where: { id },
      });

      if (!project) {
        throw new NotFoundException(`Project with ID ${id} not found.`);
      }

      return await this.projectRepository.update(project.id, {
        deleted_at: new Date(),
        is_deleted: true,
      });
    } catch (error) {
      this.logger.error(ProjectService.name, error);
      throw error;
    }
  }
}
