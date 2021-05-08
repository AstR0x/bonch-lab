import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';

import { ITask } from './interfaces';
import { TasksStructure } from './types';
import { TASKS_STRUCTURE } from './constants';
import { CreateTaskDto, UpdateTaskDto } from './dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Tasks') private readonly TasksModel: Model<ITask>,
  ) {}

  async getTaskList(query): Promise<ITask[]> {
    return this.TasksModel.find(query).exec();
  }

  async getStructure(): Promise<TasksStructure> {
    return TASKS_STRUCTURE;
  }

  async getRandomTaskIds() {
    const promises = [];

    _.toPairs(TASKS_STRUCTURE).map(([topic, { subtopics }]) =>
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

  async getTaskById(id: string): Promise<ITask> {
    return this.TasksModel.findById(id);
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<ITask> {
    const createdTask = new this.TasksModel(createTaskDto);
    return createdTask.save();
  }

  async deleteTask(id: string): Promise<ITask> {
    return this.TasksModel.findByIdAndRemove(id);
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<ITask> {
    return this.TasksModel.findByIdAndUpdate(id, updateTaskDto, { new: true });
  }
}
