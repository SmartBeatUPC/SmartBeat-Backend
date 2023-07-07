import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicalInformationDto } from './create-medical-information.dto';

export class UpdateMedicalInformationDto extends PartialType(CreateMedicalInformationDto) {
  id: number;
}
