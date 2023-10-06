import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateRecommendationDto, RecommendationServiceImpl, UpdateRecommendationDto } from 'src/application/index.application';



@Controller()
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationServiceImpl) {}

  @MessagePattern({cmd: 'createRecommendation'})
  create(data: { id: number, createRecommendationDto: CreateRecommendationDto}) {
    const {id, createRecommendationDto} = data
    return this.recommendationService.create(id, createRecommendationDto);
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
  makeGPTRecommendation(data: {methodology: boolean, age: number, gender: string, ppg: any, medicalInformation: any, pathologies: string[]}) {
    const {methodology, age, gender, ppg, medicalInformation, pathologies} = data
    return this.recommendationService.makeGPTRecommendation(methodology, age, gender, ppg,medicalInformation, pathologies);
  }

  
}
