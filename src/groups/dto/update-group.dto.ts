import * as mongoose from 'mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateGroupDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  codeword: string;
}
