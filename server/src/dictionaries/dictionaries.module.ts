import { Module } from '@nestjs/common';

import { GroupsModule } from 'src/groups/groups.module';

import { DictionariesService } from './dictionaries.service';
import { DictionariesController } from './dictionaries.controller';

@Module({
  imports: [GroupsModule],
  providers: [DictionariesService],
  controllers: [DictionariesController],
  exports: [DictionariesService],
})
export class DictionariesModule {}
