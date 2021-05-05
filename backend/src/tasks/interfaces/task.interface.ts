import { Document } from 'mongoose';

export interface ITask extends Document {
  readonly topic: number;
  readonly subtopic: number;
  readonly level: number;
  readonly formulation: string;
}
