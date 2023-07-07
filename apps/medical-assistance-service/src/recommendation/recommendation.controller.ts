import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RecommendationService } from './recommendation.service';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { UpdateRecommendationDto } from './dto/update-recommendation.dto';

@Controller()
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @MessagePattern('createRecommendation')
  create(@Payload() createRecommendationDto: CreateRecommendationDto) {
    return this.recommendationService.create(createRecommendationDto);
  }

  @MessagePattern('findAllRecommendation')
  findAll() {
    return this.recommendationService.findAll();
  }

  @MessagePattern('findOneRecommendation')
  findOne(@Payload() id: number) {
    return this.recommendationService.findOne(id);
  }

  @MessagePattern('updateRecommendation')
  update(@Payload() updateRecommendationDto: UpdateRecommendationDto) {
    return this.recommendationService.update(updateRecommendationDto.id, updateRecommendationDto);
  }

  @MessagePattern('removeRecommendation')
  remove(@Payload() id: number) {
    return this.recommendationService.remove(id);
  }
}
