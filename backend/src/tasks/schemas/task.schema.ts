import * as mongoose from 'mongoose';
import * as _ from 'lodash';

export const TaskSchema = new mongoose.Schema({
  topic: {
    type: Number,
    required: true,
    default: null,
  },
  subtopic: {
    type: Number,
    required: true,
    default: null,
  },
  level: {
    type: Number,
    required: true,
    default: null,
  },
  formulation: {
    type: String,
    required: true,
    default: null,
  },
  isAttachmentLoaded: {
    type: Boolean,
    default: false,
  },
});

TaskSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id;

    return _.omit(obj, ['_id', '__v']);
  },
});
