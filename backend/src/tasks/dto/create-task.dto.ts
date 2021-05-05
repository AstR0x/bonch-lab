import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ description: 'Идентификатор темы задачи' })
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly topic: number;

  @ApiProperty({ description: 'Идентификатор подтемы задачи' })
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly subtopic: number;

  @ApiProperty({ description: 'Идентификатор уровня сложности задачи' })
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly level: number;

  @ApiProperty({ description: 'Формулировка задачи' })
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly formulation: string;
}
