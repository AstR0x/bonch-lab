import { Document } from 'mongoose';

export interface IComment extends Document {
  author: string;
  message: string;
  creationDate: string;
}
