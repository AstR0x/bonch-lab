import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { IDictionary } from './interfaces';
import { DictionariesService } from './dictionaries.service';

@ApiTags('dictionaries')
@Controller('dictionaries')
export class DictionariesController {
  constructor(private readonly dictionariesService: DictionariesService) {}

  @ApiOperation({ summary: 'Получение списка групп.' })
  @Get('/groups')
  async getGroups(): Promise<IDictionary[]> {
    return this.dictionariesService.getGroupList();
  }

  @ApiOperation({ summary: 'Получение списка тем.' })
  @Get('/topics')
  async getTopics(): Promise<IDictionary[]> {
    return this.dictionariesService.getTopicList();
  }
}
