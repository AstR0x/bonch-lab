import { Test, TestingModule } from '@nestjs/testing';

import { DictionariesController } from './dictionaries.controller';

describe('Dictionaries Controller', () => {
  let controller: DictionariesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DictionariesController],
    }).compile();

    controller = module.get<DictionariesController>(DictionariesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
