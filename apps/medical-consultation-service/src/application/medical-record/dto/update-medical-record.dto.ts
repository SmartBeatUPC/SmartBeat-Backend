import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicalRecordDto } from './create-medical-record.dto';
import { BaseResponse } from 'src/utils/base.response';

export class UpdateMedicalRecordDto extends PartialType(CreateMedicalRecordDto) {
}
export class MedicalRecordResponse extends BaseResponse<UpdateMedicalRecordDto>{}