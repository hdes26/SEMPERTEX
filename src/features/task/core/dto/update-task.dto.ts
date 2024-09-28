import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatusEnum } from 'src/database/core/enum';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty()
  @IsEnum(TaskStatusEnum)
  @IsNotEmpty()
  status: TaskStatusEnum;
}
