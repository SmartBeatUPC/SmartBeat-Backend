import { CreateRecommendationDto, UpdateRecommendationDto } from "src/application/index.application";

export interface RecommendationService{
    create(recordId:number, createRecommendationDto: CreateRecommendationDto);
    findAll();
    findOne(id: number);
    update(id: number, updateRecommendationDto: UpdateRecommendationDto);
}