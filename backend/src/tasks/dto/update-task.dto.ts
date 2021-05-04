import * as mongoose from 'mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  formulation: string;
}
