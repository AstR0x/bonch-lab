import * as mongoose from 'mongoose';
import * as _ from 'lodash';

import { CommentSchema } from './comment.schema';
import { LabStatusEnum } from '../enums';

export const LabSchema = new mongoose.Schema({
  task: {
    type: mongoose.Types.ObjectId,
    ref: 'Tasks',
  },
  executor: {
    type: mongoose.Types.ObjectId,
    ref: 'Users',
  },
  status: {
    type: String,
    enum: Object.values(LabStatusEnum),
    default: LabStatusEnum.Open,
  },
  comments: [CommentSchema],
  isReportLoaded: {
    type: Boolean,
    default: false,
  },
});

LabSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id;

    return _.omit(obj, ['_id', '__v']);
  },
});
