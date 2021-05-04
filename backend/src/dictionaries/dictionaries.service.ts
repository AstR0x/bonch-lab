import * as _ from 'lodash';
import { Injectable } from '@nestjs/common';

import { GroupsService } from 'src/groups/groups.service';
import { TaskTopicEnum } from 'src/tasks/enum';
import { TASK_TOPICS, TASK_SUBTOPICS, TASK_LEVELS } from 'src/tasks/constants';

import { IDictionary } from './interfaces/dictionary.interface';

@Injectable()
export class DictionariesService {
  constructor(private readonly groupsService: GroupsService) {}

  async getGroupList(): Promise<IDictionary[]> {
    const groupList = await this.groupsService.getGroupList();

    return groupList.map((group) => ({ id: group.id, title: group.name }));
  }

  async getTopicList(): Promise<IDictionary[]> {
    return _.values(TASK_TOPICS);
  }

  async getSubtopicList(): Promise<IDictionary[]> {
    return _.values(TASK_SUBTOPICS);
  }

  async getLevelList(): Promise<IDictionary[]> {
    return _.values(TASK_LEVELS);
  }
}
