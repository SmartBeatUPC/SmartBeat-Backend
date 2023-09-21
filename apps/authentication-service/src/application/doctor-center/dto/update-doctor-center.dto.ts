import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorCenterDto } from './create-doctor-center.dto';
import { BaseResponse } from 'src/utils/base.response';

export class UpdateDoctorCenterDto extends PartialType(CreateDoctorCenterDto) {
  
}

export class DoctorCenterResponse extends BaseResponse<UpdateDoctorCenterDto>{}
