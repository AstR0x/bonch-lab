import {
  Controller,
  ValidationPipe,
  UseGuards,
  Query,
  Param,
  Body,
  Get,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

import { Role } from 'src/auth/decorators';
import { RoleGuard } from 'src/auth/guards';
import { RoleEnum } from 'src/users/enums';

import { ITask } from './interfaces';
import { TasksStructure } from './types';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { TasksService } from './tasks.service';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: 'Получение списка задач.' })
  @ApiBearerAuth()
  @Role(RoleEnum.Teacher)
  @UseGuards(RoleGuard)
  @Get()
  async getTaskList(@Query() query): Promise<ITask[]> {
    return this.tasksService.getTaskList(query);
  }

  @ApiOperation({ summary: 'Получение структуры тем/подтем/уровней.' })
  @ApiBearerAuth()
  @Role(RoleEnum.Teacher)
  @UseGuards(RoleGuard)
  @Get('/structure')
  async getStructure(): Promise<TasksStructure> {
    return this.tasksService.getStructure();
  }

  @ApiOperation({ summary: 'Получение одной задачи.' })
  @ApiBearerAuth()
  @Role(RoleEnum.Teacher)
  @UseGuards(RoleGuard)
  @Get('/:id')
  async getTask(@Param('id') id: string): Promise<ITask> {
    return this.tasksService.getTaskById(id);
  }

  @ApiOperation({ summary: 'Создание задачи.' })
  @ApiBearerAuth()
  @Role(RoleEnum.Teacher)
  @UseGuards(RoleGuard)
  @Post('/create')
  async createGroup(
    @Body(new ValidationPipe()) createTaskDto: CreateTaskDto,
  ): Promise<ITask> {
    return this.tasksService.createTask(createTaskDto);
  }

  @ApiOperation({ summary: 'Обновление задачи.' })
  @ApiBearerAuth()
  @Role(RoleEnum.Teacher)
  @UseGuards(RoleGuard)
  @Patch('/update/:id')
  async updateGroup(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateTaskDto: UpdateTaskDto,
  ): Promise<ITask> {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @ApiOperation({ summary: 'Удаление задачи.' })
  @ApiBearerAuth()
  @Role(RoleEnum.Teacher)
  @UseGuards(RoleGuard)
  @Delete('/delete/:id')
  async deleteTask(@Param('id') id: string): Promise<ITask> {
    return this.tasksService.deleteTask(id);
  }
}
