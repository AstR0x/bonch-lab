import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Query,
  Body,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response, Express } from 'express';

import { Roles } from 'src/auth/decorators';
import { RoleGuard } from 'src/auth/guards';
import { RoleEnum } from 'src/users/enums';

import { ILab } from './interfaces';
import { UpdateLabDto, CreateCommentDto } from './dto';
import { LabsService } from './labs.service';

@ApiTags('labs')
@Controller('labs')
export class LabsController {
  constructor(private readonly labsService: LabsService) {}

  @ApiOperation({ summary: 'Получение списка лабораторных работ.' })
  @ApiBearerAuth()
  @Roles([RoleEnum.Student])
  @UseGuards(RoleGuard)
  @Get()
  async getLabList(@Req() req: Request, @Query() query): Promise<ILab[]> {
    return this.labsService.getLabList(req, query);
  }

  @ApiOperation({ summary: 'Получение одной лабораторной работы.' })
  @ApiBearerAuth()
  @Roles([RoleEnum.Teacher, RoleEnum.Student])
  @UseGuards(RoleGuard)
  @Get('/:id')
  async getLab(@Param('id') id: string): Promise<ILab> {
    return this.labsService.getLabById(id);
  }

  @ApiOperation({ summary: 'Обновление лабораторной работы.' })
  @ApiBearerAuth()
  @Roles([RoleEnum.Teacher, RoleEnum.Student])
  @UseGuards(RoleGuard)
  @Patch('update/:id')
  async updateLab(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateLabDto: UpdateLabDto,
  ): Promise<ILab> {
    return this.labsService.updateLab(id, updateLabDto);
  }

  @ApiOperation({ summary: 'Создание комментария к лабораторной работе.' })
  @ApiBearerAuth()
  @Roles([RoleEnum.Teacher, RoleEnum.Student])
  @UseGuards(RoleGuard)
  @Post('/:id/comments/create')
  async createComment(
    @Param('id') id: string,
    @Body(new ValidationPipe()) createCommentDto: CreateCommentDto,
    @Req() req: Request,
  ): Promise<ILab> {
    return this.labsService.createComment(id, createCommentDto, req);
  }

  @ApiOperation({ summary: 'Загрузка отчёта по лабораторной работе.' })
  @ApiBearerAuth()
  @Roles([RoleEnum.Student])
  @UseGuards(RoleGuard)
  @Post('/:id/report/upload')
  @UseInterceptors(FileInterceptor('report'))
  uploadReport(
    @Param('id') id: string,
    @UploadedFile() report: Express.Multer.File,
  ) {
    return this.labsService.uploadReport(id, report);
  }

  @ApiOperation({ summary: 'Скачивание отчёта по лабораторной работе.' })
  @ApiBearerAuth()
  @Roles([RoleEnum.Teacher, RoleEnum.Student])
  @UseGuards(RoleGuard)
  @Get('/:id/report/download')
  async downloadReport(@Param('id') id: string, @Res() res: Response) {
    return res.download(`./uploads/reports/${id}`);
  }
}
