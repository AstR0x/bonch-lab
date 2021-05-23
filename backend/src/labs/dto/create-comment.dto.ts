import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ description: 'Сообщение комментария' })
  @IsString()
  message: string;
}
