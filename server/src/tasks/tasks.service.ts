import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Express } from 'express';
import * as _ from 'lodash';
import * as fs from 'fs';

import { ITask } from './interfaces';
import { TOPICS_STRUCTURE } from './constants';
import { CreateTaskDto, UpdateTaskDto } from './dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Tasks') private readonly TasksModel: Model<ITask>,
  ) {}

  /**
   * Получение списка задач
   *
   * @param query - параметры задачи
   * @returns промис со списком задач
   */
  async getTaskList(query): Promise<ITask[]> {
    return this.TasksModel.find(query).exec();
  }

  /**
   * Получение списка идентификаторов случайных задач
   *
   * @returns промис со списком идентификаторов задач
   */
  async getRandomTaskIds() {
    const promises = [];

    _.toPairs(TOPICS_STRUCTURE).map(([topic, { subtopics }]) =>
      _.toPairs(subtopics).map(([subtopic, { levels }]) =>
        _.keys(levels).map(async (level) =>
          promises.push(
            new Promise((resolve) => {
              this.TasksModel.find({
                topic: Number(topic),
                subtopic: Number(subtopic),
                level: Number(level),
              }).then((taskList) => {
                const random = Math.floor(Math.random() * taskList.length);
                const { id } = taskList[random];

                return resolve(id);
              });
            }),
          ),
        ),
      ),
    );

    return await Promise.all(promises);
  }

  /**
   * Получение задачи
   *
   * @param id - идентификатор задачи
   * @returns промис с задачей
   */
  async getTaskById(id: string): Promise<ITask> {
    return this.TasksModel.findById(id);
  }

  /**
   * Создание задачи
   *
   * @param createTaskDto - данные, создаваемой задачи
   * @param attachment - приложение к задаче
   * @returns промис с созданной задачей
   */
  async createTask(
    createTaskDto: CreateTaskDto,
    attachment: Express.Multer.File,
  ): Promise<ITask> {
    const createdTask = new this.TasksModel(
      !attachment
        ? createTaskDto
        : { ...createTaskDto, isAttachmentLoaded: true },
    );

    if (attachment) {
      fs.writeFile(
        `./uploads/attachments/${createdTask._id}`,
        attachment.buffer,
        (error) => {
          if (error) console.log(error);
        },
      );
    }

    return createdTask.save();
  }

  /**
   * Обновление задачи
   *
   * @param id - идентификатор задачи
   * @param updateTaskDto - данные, обновляемой задачи
   * @param attachment - приложение к задаче
   * @returns промис с обновлённой задачей
   */
  async updateTask(
    id: string,
    updateTaskDto: UpdateTaskDto,
    attachment: Express.Multer.File,
  ): Promise<ITask> {
    if (attachment) {
      fs.writeFile(
        `./uploads/attachments/${id}`,
        attachment.buffer,
        (error) => {
          if (error) console.log(error);
        },
      );
    }

    return this.TasksModel.findByIdAndUpdate(
      id,
      !attachment ? updateTaskDto : { updateTaskDto, isAttachmentLoaded: true },
      { new: true },
    );
  }

  /**
   * Удаление задачи
   *
   * @param id - идентификатор задачи
   * @returns промис с удалённой задачей
   */
  async deleteTask(id: string): Promise<ITask> {
    fs.unlink(`./uploads/attachments/${id}`, (error) => {
      if (error) console.log(error);
    });

    return this.TasksModel.findByIdAndRemove(id);
  }
}
