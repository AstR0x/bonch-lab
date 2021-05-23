import { Document } from 'mongoose';

import { IComment } from './comment.interface';
import { LabStatusEnum } from '../enums';

export interface ILab extends Document {
  readonly task: string;
  readonly executor: string;
  readonly status: LabStatusEnum;
  readonly comments: IComment[];
  readonly isReportLoaded: boolean;
}
