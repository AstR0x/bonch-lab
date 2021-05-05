import * as _ from 'lodash';
import { Injectable } from '@nestjs/common';

import { GroupsService } from 'src/groups/groups.service';
import { TASKS_STRUCTURE } from 'src/tasks/constants';

import { IDictionary } from './interfaces';

@Injectable()
export class DictionariesService {
  constructor(private readonly groupsService: GroupsService) {}

  async getGroupList(): Promise<IDictionary[]> {
    const groupList = await this.groupsService.getGroupList();

    return groupList.map((group) => ({ id: group.id, title: group.name }));
  }

  async getTopicList(): Promise<IDictionary[]> {
    return _.entries(TASKS_STRUCTURE).map(([id, { title }]) => ({
      id,
      title,
    }));
  }
}
