import { Test, TestingModule } from '@nestjs/testing';

import { DictionariesService } from './dictionaries.service';

describe('UsersService', () => {
  let service: DictionariesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DictionariesService],
    }).compile();

    service = module.get<DictionariesService>(DictionariesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
