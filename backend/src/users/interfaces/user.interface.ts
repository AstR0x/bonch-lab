import { Document } from 'mongoose';

export interface IUser extends Document {
  status: string;
  readonly name: string;
  readonly surname: string;
  readonly patronymic: string;
  readonly group: string;
  readonly role: string;
  readonly email: string;
  readonly password: string;
  readonly regDate: string;
}
