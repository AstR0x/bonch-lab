import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  Matches,
} from 'class-validator';

import { RoleEnum } from '../enums/role.enum';

export class CreateUserDto {
  @ApiProperty({ description: 'Кодовое слово, выдаваемое администратором или преподавателем' })
  @IsString()
  @IsNotEmpty()
  readonly codeword: string

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
  readonly role: RoleEnum

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
  @Matches(
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
    { message: 'Слабый пароль' },
  )
  @ApiProperty()
  readonly password: string;
}
