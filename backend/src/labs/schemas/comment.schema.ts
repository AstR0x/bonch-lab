import * as mongoose from 'mongoose';
import * as _ from 'lodash';

export const CommentSchema = new mongoose.Schema({
  message: String,
  author: { type: mongoose.Types.ObjectId, ref: 'Users' },
  creationDate: { type: Date, default: Date },
});

CommentSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id;

    return _.omit(obj, ['_id', '__v']);
  },
});
