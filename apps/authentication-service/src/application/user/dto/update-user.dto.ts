import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { BaseResponse } from 'src/utils/base.response';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  
}
export class UserResponse extends BaseResponse<UpdateUserDto>{}