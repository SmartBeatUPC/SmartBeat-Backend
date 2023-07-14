import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicalPrescriptionDto } from './create-medical-prescription.dto';

export class UpdateMedicalPrescriptionDto extends PartialType(CreateMedicalPrescriptionDto) {
  id: number;
}
