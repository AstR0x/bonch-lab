import * as fs from 'fs';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Request, Express } from 'express';

import { ITokenPayload } from 'src/auth/interfaces';

import { ILab, IComment } from './interfaces';
import { CreateCommentDto, UpdateLabDto } from './dto';

@Injectable()
export class LabsService {
  constructor(
    @InjectModel('Labs') private readonly LabsModel: Model<ILab>,
    @InjectModel('Comments') private readonly CommentsModel: Model<IComment>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Получение списка лабораторных работ
   *
   * @param req - запрос
   * @param query - параметры задачи
   * @returns промис со списком лабораторных работ
   */
  async getLabList(req: Request, query): Promise<ILab[]> {
    const [, token] = req.headers.authorization.split(' ');
    const { id } = this.jwtService.decode(token) as ITokenPayload;

    const labs = await this.LabsModel.find({ executor: id })
      .populate({ path: 'task', match: query })
      .exec();

    return labs.filter((lab) => lab.task);
  }

  /**
   * Получение лабораторной работы
   *
   * @param id - идентификатор лабораторной работы
   * @returns промис с лабораторной работой
   */
  async getLabById(id: string): Promise<ILab> {
    return this.LabsModel.findById(id).populate([
      'comments.author',
      'executor',
      'task',
    ]);
  }

  /**
   * Создание лабораторной работы
   *
   * @param taskId - идентификатор задачи
   * @param userId - идентификатор пользователя
   * @returns промис с созданной лабораторной работой
   */
  async createLab(taskId: string, userId: string): Promise<ILab> {
    const createdLab = new this.LabsModel({ task: taskId, executor: userId });

    return createdLab.save();
  }

  /**
   * Обновление лабораторной работы
   *
   * @param id - идентификатор лабораторной работы
   * @param updateLabDto - обновлённые данные лабораторной работы
   * @returns промис с обновленной лабораторной работой
   */
  async updateLab(id: string, updateLabDto: UpdateLabDto): Promise<ILab> {
    return this.LabsModel.findByIdAndUpdate(id, updateLabDto, {
      new: true,
    }).populate(['comments.author', 'executor', 'task']);
  }

  /**
   * Создание комментария к лабораторной работе
   *
   * @param req - запрос
   * @param id - идентификатор лабораторной работы
   * @param createCommentDto - данные комментария
   * @returns промис с обновлённой лабораторной работой
   */
  async createComment(
    req: Request,
    id: string,
    createCommentDto: CreateCommentDto,
  ): Promise<ILab> {
    const [, token] = req.headers.authorization.split(' ');
    const decodedToken = this.jwtService.decode(token) as ITokenPayload;
    const comment = new this.CommentsModel({
      ...createCommentDto,
      author: decodedToken.id,
    });

    return this.LabsModel.findByIdAndUpdate(
      id,
      { $push: { comments: comment } },
      { new: true },
    ).populate(['comments.author', 'executor', 'task']);
  }

  /**
   * Загрузка отчёта по лабораторной работе
   *
   * @param id - идентификатор лабораторной работы
   * @param report - отчёт по лабораторной работе
   * @returns промис с обновленной лабораторной работой
   */
  async uploadReport(id: string, report: Express.Multer.File): Promise<ILab> {
    // Сохраняем файл в системе
    fs.writeFile(`./uploads/${id}`, report.buffer, () => {});

    return this.LabsModel.findByIdAndUpdate(
      id,
      { isReportLoaded: true },
      { new: true },
    ).populate(['comments.author', 'executor', 'task']);
  }
}
