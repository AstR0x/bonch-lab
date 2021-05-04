import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

import { TaskTopicEnum, TaskSubtopicEnum, TaskLevelEnum } from '../enum';

export class CreateTaskDto {
  @ApiProperty({ description: 'Тема задачи' })
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly topic: TaskTopicEnum;

  @ApiProperty({ description: 'Подтема задачи' })
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly subtopic: TaskSubtopicEnum;

  @ApiProperty({ description: 'Уровень сложности задачи' })
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly level: TaskLevelEnum;

  @ApiProperty({ description: 'Формулировка задачи' })
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly formulation: string;
}
