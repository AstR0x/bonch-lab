import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { TopicsStructure } from 'src/tasks/types';

import { IDictionaryItem } from './interfaces';
import { DictionariesService } from './dictionaries.service';

@ApiTags('dictionaries')
@Controller('dictionaries')
export class DictionariesController {
  constructor(private readonly dictionariesService: DictionariesService) {}

  @ApiOperation({ summary: 'Получение списка групп.' })
  @Get('/groups')
  async getGroups(): Promise<IDictionaryItem[]> {
    return this.dictionariesService.getGroupList();
  }

  @ApiOperation({ summary: 'Получение списка тем.' })
  @Get('/topics')
  async getTopics(): Promise<IDictionaryItem[]> {
    return this.dictionariesService.getTopicList();
  }

  @ApiOperation({ summary: 'Получение структуры тем/подтем/уровней.' })
  @Get('/structure')
  async getStructure(): Promise<TopicsStructure> {
    return this.dictionariesService.getStructure();
  }
}
