import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateRecommendationDto, RecommendationServiceImpl, UpdateRecommendationDto } from 'src/application/index.application';



@Controller()
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationServiceImpl) {}

  @MessagePattern({cmd: 'createRecommendation'})
  create(data: { recordId: number, createRecommendationDto: CreateRecommendationDto}) {
    const {recordId, createRecommendationDto} = data
    return this.recommendationService.create(recordId, createRecommendationDto);
  }

  @MessagePattern({cmd: 'findAllRecommendations'})
  findAll() {
    return this.recommendationService.findAll();
  }

  @MessagePattern({cmd: 'findOneRecommendation'})
  findOne(@Payload() id: number) {
    return this.recommendationService.findOne(id);
  }

  @MessagePattern({cmd: 'updateRecommendation'})
  update(data: {id: number, updateRecommendationDto: UpdateRecommendationDto}) {
    const {id, updateRecommendationDto} = data;
    return this.recommendationService.update(id, updateRecommendationDto);
  }

  @MessagePattern({cmd: 'generateGPTRecommendation'})
  assistanceGPT() {
    return this.recommendationService.startOpenAI();
  }

  @MessagePattern({cmd: 'makeGPTRecommendation'})
  makeGPTRecommendation(data: {methodology: boolean, age: number, gender: string, medicalInformation: any, pathologies: string[]}) {
    const {methodology, age, gender, medicalInformation, pathologies} = data
    return this.recommendationService.makeGPTRecommendation(methodology, age, gender, medicalInformation, pathologies);
  }

  
}
