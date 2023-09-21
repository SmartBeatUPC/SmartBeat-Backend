import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDecimal, IsString, MaxLength, MinLength } from "class-validator";
import { RequestMedicalInformationDto } from "src/api-gateway/medical-information/models/medical-information.dto";
import { RequestPathologyDto } from "src/api-gateway/medical-information/models/pathology.dto";

export class RequestRecommendationDto{

    @ApiProperty()
    @IsString()
    @MinLength(1)
    @MaxLength(400)
    recommendation: string;
}

export class RequestGPTDto{

    @ApiProperty()
    @IsBoolean()
    methodology: boolean;

    @ApiProperty()
    medicalInformation: RequestMedicalInformationDto;

    @ApiProperty()
    pathologies: RequestPathologyDto[];
}