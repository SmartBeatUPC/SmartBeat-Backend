import { Test, TestingModule } from '@nestjs/testing';
import { HealthCenterController } from './health-center.controller';
import { HealthCenterService } from './health-center.service';

describe('HealthCenterController', () => {
  let controller: HealthCenterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthCenterController],
      providers: [HealthCenterService],
    }).compile();

    controller = module.get<HealthCenterController>(HealthCenterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
