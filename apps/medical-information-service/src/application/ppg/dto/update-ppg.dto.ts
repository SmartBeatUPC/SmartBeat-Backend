import { PartialType } from '@nestjs/mapped-types';
import { CreatePpgDto } from './create-ppg.dto';
import { BaseResponse } from 'src/utils/base.response';

export class UpdatePpgDto extends PartialType(CreatePpgDto) {
  
}
export class PpgResponse extends BaseResponse<UpdatePpgDto>{}