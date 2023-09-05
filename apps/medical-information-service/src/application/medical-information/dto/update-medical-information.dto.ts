import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicalInformationDto } from './create-medical-information.dto';
import { BaseResponse } from 'src/utils/base.response';

export class UpdateMedicalInformationDto extends PartialType(CreateMedicalInformationDto) {
  
}

export class MedicalInformationResponse extends BaseResponse<UpdateMedicalInformationDto>{}


