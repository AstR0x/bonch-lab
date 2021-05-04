import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ITask } from './interfaces/task.interface';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel('Tasks') private readonly tasksModel: Model<ITask>,
  ) {}

  async getTaskList(query): Promise<ITask[]> {
    return this.tasksModel.find(query).exec();
  }

  async getTaskById(id: string): Promise<ITask> {
    return this.tasksModel.findById(id);
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<ITask> {
    const createdTask = new this.tasksModel(createTaskDto);
    return createdTask.save();
  }

  async deleteTask(id: string): Promise<ITask> {
    return this.tasksModel.findByIdAndRemove(id);
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<ITask> {
    return this.tasksModel.findByIdAndUpdate(id, updateTaskDto, { new: true });
  }
}
