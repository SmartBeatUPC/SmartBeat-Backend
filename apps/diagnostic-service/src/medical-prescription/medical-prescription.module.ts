import { Module } from '@nestjs/common';
import { MedicalPrescriptionService } from './medical-prescription.service';
import { MedicalPrescriptionController } from './medical-prescription.controller';

@Module({
  controllers: [MedicalPrescriptionController],
  providers: [MedicalPrescriptionService]
})
export class MedicalPrescriptionModule {}
