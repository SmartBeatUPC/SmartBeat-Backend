import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRecommendationDto {
    @IsString()
    recommendation: string;

}
