import * as mongoose from 'mongoose';
import * as _ from 'lodash';

export const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  codeword: { type: String, required: true },
  students: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Users',
    },
  ],
});

GroupSchema.index({ codeword: 1, name: 1 }, { unique: true });

GroupSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id;

    return _.omit(obj, ['_id', '__v']);
  },
});
