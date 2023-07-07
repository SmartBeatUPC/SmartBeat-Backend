import { Test, TestingModule } from '@nestjs/testing';
import { PpgController } from './ppg.controller';
import { PpgService } from './ppg.service';

describe('PpgController', () => {
  let controller: PpgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PpgController],
      providers: [PpgService],
    }).compile();

    controller = module.get<PpgController>(PpgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
