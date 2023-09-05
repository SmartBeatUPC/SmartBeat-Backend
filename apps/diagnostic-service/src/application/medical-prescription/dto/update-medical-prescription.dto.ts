import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicalPrescriptionDto } from './create-medical-prescription.dto';
import { BaseResponse } from 'src/utils/base.response';

export class UpdateMedicalPrescriptionDto extends PartialType(CreateMedicalPrescriptionDto) {
  
}
export class MedicalPrescriptionResponse extends BaseResponse<UpdateMedicalPrescriptionDto>{}