import { Module } from '@nestjs/common';
import { MedicalInformationService } from './medical-information.service';
import { MedicalInformationController } from './medical-information.controller';

@Module({
  controllers: [MedicalInformationController],
  providers: [MedicalInformationService]
})
export class MedicalInformationModule {}
