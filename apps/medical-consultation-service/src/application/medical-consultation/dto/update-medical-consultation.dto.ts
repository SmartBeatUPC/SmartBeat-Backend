import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicalConsultationDto } from './create-medical-consultation.dto';
import { BaseResponse } from 'src/utils/base.response';

export class UpdateMedicalConsultationDto extends PartialType(CreateMedicalConsultationDto) {
}
export class MedicalConsultationResponse extends BaseResponse<UpdateMedicalConsultationDto>{}