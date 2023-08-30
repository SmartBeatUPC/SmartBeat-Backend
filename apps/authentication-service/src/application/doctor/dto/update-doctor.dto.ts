import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorDto } from './create-doctor.dto';
import { BaseResponse } from 'src/utils/base.response';

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {
  id: number;
}
export class DoctorResponse extends BaseResponse<UpdateDoctorDto>{}