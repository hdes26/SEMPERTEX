import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TaskPriorityService } from './use-case/task-priority.service';
import { CreateTaskPriorityDto } from './core/dto/create-task-priority.dto';
import { UpdateTaskPriorityDto } from './core/dto/update-task-priority.dto';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { BasicGuard } from 'src/utils/guards/basic';

@ApiTags('task-priority')
@Controller('task-priority')
@ApiBasicAuth()
@UseGuards(BasicGuard)
export class TaskPriorityController {
  constructor(private readonly taskPriorityService: TaskPriorityService) {}

  @Post()
  async create(@Body() createTaskPriorityDto: CreateTaskPriorityDto) {
    return await this.taskPriorityService.create(createTaskPriorityDto);
  }

  @Get()
  async findAll() {
    return await this.taskPriorityService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.taskPriorityService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskPriorityDto: UpdateTaskPriorityDto,
  ) {
    return await this.taskPriorityService.update(id, updateTaskPriorityDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.taskPriorityService.remove(id);
  }
}
