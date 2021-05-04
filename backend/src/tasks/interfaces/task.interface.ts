import { Document } from 'mongoose';

import { TaskTopicEnum, TaskSubtopicEnum, TaskLevelEnum } from '../enum';

export interface ITask extends Document {
  readonly topic: TaskTopicEnum;
  readonly subtopic: TaskSubtopicEnum;
  readonly level: TaskLevelEnum;
  readonly formulation: string;
}
