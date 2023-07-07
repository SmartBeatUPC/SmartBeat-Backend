import { Test, TestingModule } from '@nestjs/testing';
import { MedicalInformationController } from './medical-information.controller';
import { MedicalInformationService } from './medical-information.service';

describe('MedicalInformationController', () => {
  let controller: MedicalInformationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalInformationController],
      providers: [MedicalInformationService],
    }).compile();

    controller = module.get<MedicalInformationController>(MedicalInformationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
