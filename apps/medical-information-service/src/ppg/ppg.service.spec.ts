import { Test, TestingModule } from '@nestjs/testing';
import { PpgService } from './ppg.service';

describe('PpgService', () => {
  let service: PpgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PpgService],
    }).compile();

    service = module.get<PpgService>(PpgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
