import {
  Controller,
  ValidationPipe,
  UseGuards,
  Param,
  Body,
  Get,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

import { Role } from 'src/auth/decorators/role-auth.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { RoleEnum } from 'src/users/enums/role.enum';

import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupsService } from './groups.service';
import { IGroup } from './interfaces/group.interface';

@ApiTags('groups')
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @ApiOperation({ summary: 'Получение списка групп.' })
  @ApiBearerAuth()
  @Role(RoleEnum.teacher)
  @UseGuards(RoleGuard)
  @Get()
  async getGroups(): Promise<IGroup[]> {
    return await this.groupsService.getGroups();
  }

  @ApiOperation({ summary: 'Получение одной группы.' })
  @ApiBearerAuth()
  @Role(RoleEnum.teacher)
  @UseGuards(RoleGuard)
  @Get('/:id')
  async getGroup(@Param('id') id: string): Promise<IGroup> {
    return await this.groupsService.getGroupById(id);
  }

  @ApiOperation({ summary: 'Создание группы.' })
  @ApiBearerAuth()
  @Role(RoleEnum.teacher)
  @UseGuards(RoleGuard)
  @Post('/create')
  async createGroup(
    @Body(new ValidationPipe()) createGroupDto: CreateGroupDto): Promise<IGroup> {
    return this.groupsService.createGroup(createGroupDto);
  }

  @ApiOperation({ summary: 'Обновление группы.' })
  @ApiBearerAuth()
  @Role(RoleEnum.teacher)
  @UseGuards(RoleGuard)
  @Patch('/update/:id')
  async updateGroup(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateGroupDto: UpdateGroupDto
  ): Promise<IGroup> {
    return await this.groupsService.updateGroup(id, updateGroupDto)
}

  @ApiOperation({ summary: 'Удаление группы.' })
  @ApiBearerAuth()
  @Role(RoleEnum.teacher)
  @UseGuards(RoleGuard)
  @Delete('/delete/:id')
  async deleteGroup(@Param('id') id: string): Promise<IGroup> {
    return this.groupsService.deleteGroup(id);
  }
}
