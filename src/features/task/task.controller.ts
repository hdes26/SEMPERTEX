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
import { TaskService } from './use-case/task.service';
import { CreateTaskDto } from './core/dto/create-task.dto';
import { UpdateTaskDto } from './core/dto/update-task.dto';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { BasicGuard } from 'src/utils/guards/basic';

@ApiTags('task')
@Controller('task')
@ApiBasicAuth()
@UseGuards(BasicGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return await this.taskService.create(createTaskDto);
  }

  @Get(':id/assign/:memberId')
  async assign(@Param('id') id: string, @Param('memberId') memberId: string) {
    return await this.taskService.assign(id, memberId);
  }

  @Get()
  async findAll() {
    return await this.taskService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.taskService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return await this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.taskService.remove(id);
  }
}
