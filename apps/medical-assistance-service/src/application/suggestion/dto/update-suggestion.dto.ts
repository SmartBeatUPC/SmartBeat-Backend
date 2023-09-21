import { PartialType } from '@nestjs/mapped-types';
import { CreateSuggestionDto } from './create-suggestion.dto';
import { BaseResponse } from 'src/utils/base.response';

export class UpdateSuggestionDto extends PartialType(CreateSuggestionDto) {
  
}

export class SuggestionResponse extends BaseResponse<UpdateSuggestionDto>{}