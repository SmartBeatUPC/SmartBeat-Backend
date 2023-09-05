import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientDto } from './create-patient.dto';
import { BaseResponse } from 'src/utils/base.response';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
}
export class PatientResponse extends BaseResponse<UpdatePatientDto>{}