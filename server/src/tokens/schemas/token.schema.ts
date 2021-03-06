import * as mongoose from 'mongoose';
import * as _ from 'lodash';

export const TokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  uId: { type: mongoose.Types.ObjectId, required: true, ref: 'Users' },
  expireAt: { type: Date, required: true },
});

TokenSchema.index({ token: 1, uId: 1 }, { unique: true });

TokenSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id;

    return _.omit(obj, ['_id', '__v']);
  },
});
