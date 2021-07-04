import { ApiProperty } from '@nestjs/swagger';

export class UpdateGroupDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  codeword: string;
}
