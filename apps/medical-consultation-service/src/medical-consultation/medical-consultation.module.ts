import { Module } from '@nestjs/common';
import { MedicalConsultationService } from './medical-consultation.service';
import { MedicalConsultationController } from './medical-consultation.controller';

@Module({
  controllers: [MedicalConsultationController],
  providers: [MedicalConsultationService]
})
export class MedicalConsultationModule {}
