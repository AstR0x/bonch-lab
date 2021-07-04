import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ description: 'Идентификатор темы задачи' })
  @IsNumber()
  @IsNotEmpty()
  readonly topic: number;

  @ApiProperty({ description: 'Идентификатор подтемы задачи' })
  @IsNumber()
  @IsNotEmpty()
  readonly subtopic: number;

  @ApiProperty({ description: 'Идентификатор уровня сложности задачи' })
  @IsNumber()
  @IsNotEmpty()
  readonly level: number;

  @ApiProperty({ description: 'Формулировка задачи' })
  @IsString()
  @IsNotEmpty()
  readonly formulation: string;
}
