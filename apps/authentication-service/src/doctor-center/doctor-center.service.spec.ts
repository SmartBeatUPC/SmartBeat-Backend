import { Test, TestingModule } from '@nestjs/testing';
import { DoctorCenterService } from './doctor-center.service';

describe('DoctorCenterService', () => {
  let service: DoctorCenterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorCenterService],
    }).compile();

    service = module.get<DoctorCenterService>(DoctorCenterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
