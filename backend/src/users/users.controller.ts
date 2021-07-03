import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

import { Roles } from 'src/auth/decorators';
import { RoleGuard } from 'src/auth/guards';
import { RoleEnum } from 'src/users/enums';

import { IUser } from './interfaces';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Удаление пользователя.' })
  @ApiBearerAuth()
  @Roles([RoleEnum.Teacher])
  @UseGuards(RoleGuard)
  @Delete('/delete/:id')
  async deleteUser(@Param('id') id: string): Promise<IUser> {
    return this.usersService.deleteUser(id);
  }
}
