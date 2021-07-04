import { IUser } from 'src/users/interfaces';

import { IGroup } from './group.interface';

export interface IPopulatedGroup extends Omit<IGroup, 'students'> {
  students: IUser[];
}
