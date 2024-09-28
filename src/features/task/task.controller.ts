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
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
