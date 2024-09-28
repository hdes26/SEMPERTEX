import { Module } from '@nestjs/common';
import { ProjectService } from './use-case/project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/database/core/entities';
import { LoggerModule } from 'src/settings/logger';

@Module({
  imports: [LoggerModule, TypeOrmModule.forFeature([Project])],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
