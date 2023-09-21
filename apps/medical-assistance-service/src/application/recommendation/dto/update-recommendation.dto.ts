import { PartialType } from '@nestjs/mapped-types';
import { CreateRecommendationDto } from './create-recommendation.dto';
import { BaseResponse } from 'src/utils/base.response';

export class UpdateRecommendationDto extends PartialType(CreateRecommendationDto) {
  
}
export class RecommendationResponse extends BaseResponse<UpdateRecommendationDto>{}