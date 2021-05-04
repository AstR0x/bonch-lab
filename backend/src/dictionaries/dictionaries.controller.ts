import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

import { IDictionary } from './interfaces/dictionary.interface';
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

  @ApiOperation({ summary: 'Получение списка подтем.' })
  @Get('/subtopics')
  async getSubtopics(): Promise<IDictionary[]> {
    return this.dictionariesService.getSubtopicList();
  }

  @ApiOperation({ summary: 'Получение списка уровней.' })
  @Get('/levels')
  async getLevels(): Promise<IDictionary[]> {
    return this.dictionariesService.getLevelList();
  }
}
