import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from "class-validator";

export class RequestRecommendationDto{

    @ApiProperty()
    @IsString()
    @MinLength(1)
    @MaxLength(400)
    recommendation: string;
}