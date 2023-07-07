import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicalConsultationDto } from './create-medical-consultation.dto';

export class UpdateMedicalConsultationDto extends PartialType(CreateMedicalConsultationDto) {
  id: number;
}
