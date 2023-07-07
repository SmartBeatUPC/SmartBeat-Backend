import { Test, TestingModule } from '@nestjs/testing';
import { DoctorCenterController } from './doctor-center.controller';
import { DoctorCenterService } from './doctor-center.service';

describe('DoctorCenterController', () => {
  let controller: DoctorCenterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorCenterController],
      providers: [DoctorCenterService],
    }).compile();

    controller = module.get<DoctorCenterController>(DoctorCenterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
