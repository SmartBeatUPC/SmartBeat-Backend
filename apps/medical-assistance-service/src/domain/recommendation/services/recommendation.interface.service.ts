import { CreateRecommendationDto, UpdateRecommendationDto } from "src/application/index.application";

export interface RecommendationService{
    create(createRecommendationDto: CreateRecommendationDto);
    findAll();
    findOne(id: number);
    update(id: number, updateRecommendationDto: UpdateRecommendationDto);
    remove(id: number);
}