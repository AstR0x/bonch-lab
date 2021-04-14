import { Document } from 'mongoose';

export interface IGroup extends Document {
  readonly name: string;
  readonly codeword: string;
  readonly students: string[];
}
