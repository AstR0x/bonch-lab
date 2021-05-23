import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

import { RoleEnum } from '../enums';

export class CreateUserDto {
  @ApiProperty({ description: 'Кодовое слово' })
  @IsString()
  @IsNotEmpty()
  readonly codeword: string;

  @ApiProperty({ description: 'Имя' })
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: 'Фамилия' })
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly surname: string;

  @ApiProperty({ description: 'Отчество' })
  @ApiProperty()
  @IsString()
  readonly patronymic: string;

  @ApiProperty({ description: 'Роль' })
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly role: RoleEnum;

  @ApiProperty({ description: 'Академическая группа' })
  @ApiProperty()
  readonly group: string;

  @ApiProperty({ description: 'Электронная почта' })
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ description: 'Пароль' })
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;
}
