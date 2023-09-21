import { PartialType } from '@nestjs/mapped-types';
import { CreatePathologyDto } from './create-pathology.dto';
import { BaseResponse } from 'src/utils/base.response';

export class UpdatePathologyDto extends PartialType(CreatePathologyDto) {
  
}
export class PathologyResponse extends BaseResponse<UpdatePathologyDto>{}