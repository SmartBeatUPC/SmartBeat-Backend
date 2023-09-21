import { PartialType } from '@nestjs/mapped-types';
import { CreateHealthCenterDto } from './create-health-center.dto';
import { BaseResponse } from 'src/utils/base.response';

export class UpdateHealthCenterDto extends PartialType(CreateHealthCenterDto) {
  
}
export class HealthCenterResponse extends BaseResponse<UpdateHealthCenterDto>{}