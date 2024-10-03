import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';
import { TaskStatusEnum } from 'src/database/core/enum';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEnum(TaskStatusEnum)
  @IsNotEmpty()
  status: TaskStatusEnum;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  deadline: Date;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  projectId: string;
}
