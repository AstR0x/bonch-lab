import * as mongoose from 'mongoose';
import * as _ from 'lodash';

import { StatusEnum } from '../enums/status.enum';
import { RoleEnum } from '../enums/role.enum';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  patronymic: { type: String, default: null },
  email: { type: String, required: true },
  password: { type: String, required: true },
  status: {
    type: String,
    enum: Object.values(StatusEnum),
    default: StatusEnum.Confirmed,
  },
  role: {
    type: String,
    required: true,
    enum: Object.values(RoleEnum),
    default: RoleEnum.Student,
  },
  group: { type: mongoose.Types.ObjectId, ref: 'Groups' },
  registrationDate: { type: Date, default: Date.now },
});

UserSchema.index({ email: 1 }, { unique: true });

UserSchema.set('toObject', {
  transform: (doc, ret) => {
    ret.id = ret._id;

    return _.omit(ret, ['_id', '_v']);
  },
});
