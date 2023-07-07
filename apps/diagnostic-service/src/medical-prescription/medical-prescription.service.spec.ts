import { Test, TestingModule } from '@nestjs/testing';
import { MedicalPrescriptionService } from './medical-prescription.service';

describe('MedicalPrescriptionService', () => {
  let service: MedicalPrescriptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalPrescriptionService],
    }).compile();

    service = module.get<MedicalPrescriptionService>(MedicalPrescriptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
