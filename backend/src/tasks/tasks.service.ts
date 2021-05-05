import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateTaskDto, UpdateTaskDto } from './dto';
import { TasksStructure } from './types';
import { ITask } from './interfaces';
import { TASKS_STRUCTURE } from './constants';

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
