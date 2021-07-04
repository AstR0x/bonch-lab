import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  UseGuards,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';

import { Roles } from 'src/auth/decorators';
import { RoleGuard } from 'src/auth/guards';
import { RoleEnum } from 'src/users/enums';

import { ITask } from './interfaces';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { TasksService } from './tasks.service';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: 'Получение списка задач.' })
  @ApiBearerAuth()
  @Roles([RoleEnum.Teacher])
  @UseGuards(RoleGuard)
  @Get()
  async getTaskList(@Query() query): Promise<ITask[]> {
    return this.tasksService.getTaskList(query);
  }

  @ApiOperation({ summary: 'Получение одной задачи.' })
  @ApiBearerAuth()
  @Roles([RoleEnum.Teacher])
  @UseGuards(RoleGuard)
  @Get('/:id')
  async getTask(@Param('id') id: string): Promise<ITask> {
    return this.tasksService.getTaskById(id);
  }

  @ApiOperation({ summary: 'Создание задачи.' })
  @ApiBearerAuth()
  @Roles([RoleEnum.Teacher])
  @UseGuards(RoleGuard)
  @Post('/create')
  @UseInterceptors(FileInterceptor('attachment'))
  async createGroup(
    @UploadedFile() attachment: Express.Multer.File,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.createTask(createTaskDto, attachment);
  }

  @ApiOperation({ summary: 'Обновление задачи.' })
  @ApiBearerAuth()
  @Roles([RoleEnum.Teacher])
  @UseGuards(RoleGuard)
  @Patch('/update/:id')
  @UseInterceptors(FileInterceptor('attachment'))
  async updateGroup(
    @Param('id') id: string,
    @UploadedFile() attachment: Express.Multer.File,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<ITask> {
    return this.tasksService.updateTask(id, updateTaskDto, attachment);
  }

  @ApiOperation({ summary: 'Удаление задачи.' })
  @ApiBearerAuth()
  @Roles([RoleEnum.Teacher])
  @UseGuards(RoleGuard)
  @Delete('/delete/:id')
  async deleteTask(@Param('id') id: string): Promise<ITask> {
    return this.tasksService.deleteTask(id);
  }

  @ApiOperation({ summary: 'Скачивание приложения к задаче.' })
  @ApiBearerAuth()
  @Roles([RoleEnum.Teacher, RoleEnum.Student])
  @UseGuards(RoleGuard)
  @Get('/:id/attachment/download')
  async downloadAttachment(@Param('id') id: string, @Res() res: Response) {
    return res.download(`./uploads/attachments/${id}`);
  }
}
