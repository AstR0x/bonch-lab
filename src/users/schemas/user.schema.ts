import * as mongoose from 'mongoose';

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
    default: StatusEnum.active,
  },
  role: {
    type: String,
    required: true,
    enum: Object.values(RoleEnum),
    default: RoleEnum.student,
  },
  group: { type: String },
});

UserSchema.index({ email: 1 }, { unique: true });
