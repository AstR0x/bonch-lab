import { Document } from 'mongoose';

export interface IDictionary {
  readonly id: string | number;
  readonly title: string;
}
