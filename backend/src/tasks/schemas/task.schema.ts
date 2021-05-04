import * as mongoose from 'mongoose';

import { TaskTopicEnum, TaskSubtopicEnum, TaskLevelEnum } from '../enum';

export const TaskSchema = new mongoose.Schema({
  topic: {
    type: String,
    enum: Object.values(TaskTopicEnum),
    required: true,
    default: null,
  },
  subtopic: {
    type: String,
    enum: Object.values(TaskSubtopicEnum),
    required: true,
    default: null,
  },
  level: {
    type: String,
    enum: Object.values(TaskLevelEnum),
    required: true,
    default: null,
  },
  formulation: {
    type: String,
    required: true,
    default: null,
  },
});
