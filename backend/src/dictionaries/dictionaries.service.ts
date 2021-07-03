import * as _ from 'lodash';
import { Injectable } from '@nestjs/common';

import { TopicsStructure } from 'src/tasks/types';
import { TOPICS_STRUCTURE } from 'src/tasks/constants';
import { GroupsService } from 'src/groups/groups.service';

import { IDictionaryItem } from './interfaces';

@Injectable()
export class DictionariesService {
  constructor(private readonly groupsService: GroupsService) {}

  /**
   * Получение справочника групп
   *
   * @returns промис со справочником групп
   */
  async getGroupList(): Promise<IDictionaryItem[]> {
    const groupList = await this.groupsService.findGroups();

    return groupList.map((group) => ({ id: group.id, title: group.name }));
  }

  /**
   * Получение справочника тем
   *
   * @returns промис со справочником тем
   */
  async getTopicList(): Promise<IDictionaryItem[]> {
    return _.entries(TOPICS_STRUCTURE).map(([id, { title }]) => ({
      id,
      title,
    }));
  }

  /**
   * Получение структуры тем/подтем/уровней
   *
   * @returns промис со структурой
   */
  async getStructure(): Promise<TopicsStructure> {
    return TOPICS_STRUCTURE;
  }
}
