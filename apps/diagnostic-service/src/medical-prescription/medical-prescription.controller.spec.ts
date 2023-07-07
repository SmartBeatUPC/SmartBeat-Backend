import { Test, TestingModule } from '@nestjs/testing';
import { MedicalPrescriptionController } from './medical-prescription.controller';
import { MedicalPrescriptionService } from './medical-prescription.service';

describe('MedicalPrescriptionController', () => {
  let controller: MedicalPrescriptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalPrescriptionController],
      providers: [MedicalPrescriptionService],
    }).compile();

    controller = module.get<MedicalPrescriptionController>(MedicalPrescriptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
