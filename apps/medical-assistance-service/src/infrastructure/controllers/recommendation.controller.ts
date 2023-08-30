import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateRecommendationDto, RecommendationServiceImpl, UpdateRecommendationDto } from 'src/application/index.application';



@Controller()
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationServiceImpl) {}

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
  update(@Payload() id: number, updateRecommendationDto: UpdateRecommendationDto) {
    return this.recommendationService.update(id, updateRecommendationDto);
  }

  @MessagePattern('removeRecommendation')
  remove(@Payload() id: number) {
    return this.recommendationService.remove(id);
  }
}
