import * as mongoose from 'mongoose';

import { TaskStatusEnum } from '../enums/task-status.enum';

export const TaskSchema = new mongoose.Schema({
  performer: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Users',
  },
  status: {
    type: String,
    enum: Object.values(TaskStatusEnum),
    default: TaskStatusEnum.pending,
  },
  group: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Groups',
  },
});

TaskSchema.index({ email: 1 }, { unique: true });
