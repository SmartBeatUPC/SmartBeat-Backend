import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorCenterDto } from './create-doctor-center.dto';

export class UpdateDoctorCenterDto extends PartialType(CreateDoctorCenterDto) {
  id: number;
}
