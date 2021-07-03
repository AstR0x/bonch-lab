import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

import { Roles } from 'src/auth/decorators';
import { RoleGuard } from 'src/auth/guards';
import { RoleEnum } from 'src/users/enums';

import { IGroup } from './interfaces';
import { CreateGroupDto, UpdateGroupDto } from './dto';
import { GroupsService } from './groups.service';

@ApiTags('groups')
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @ApiOperation({ summary: 'Получение списка групп.' })
  @ApiBearerAuth()
  @Roles([RoleEnum.Teacher])
  @UseGuards(RoleGuard)
  @Get()
  async getGroupList(): Promise<IGroup[]> {
    return this.groupsService.findGroups();
  }

  @ApiOperation({ summary: 'Получение одной группы.' })
  @ApiBearerAuth()
  @Roles([RoleEnum.Teacher])
  @UseGuards(RoleGuard)
  @Get('/:id')
  async getGroup(@Param('id') id: string): Promise<IGroup> {
    return this.groupsService.findGroupById(id, true);
  }

  @ApiOperation({ summary: 'Создание группы.' })
  @ApiBearerAuth()
  @Roles([RoleEnum.Teacher])
  @UseGuards(RoleGuard)
  @Post('/create')
  async createGroup(@Body() createGroupDto: CreateGroupDto): Promise<IGroup> {
    return this.groupsService.createGroup(createGroupDto);
  }

  @ApiOperation({ summary: 'Обновление группы.' })
  @ApiBearerAuth()
  @Roles([RoleEnum.Teacher])
  @UseGuards(RoleGuard)
  @Patch('/update/:id')
  async updateGroup(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ): Promise<IGroup> {
    return this.groupsService.updateGroup(id, updateGroupDto);
  }

  @ApiOperation({ summary: 'Удаление группы.' })
  @ApiBearerAuth()
  @Roles([RoleEnum.Teacher])
  @UseGuards(RoleGuard)
  @Delete('/delete/:id')
  async deleteGroup(@Param('id') id: string) {
    return this.groupsService.deleteGroup(id);
  }
}
