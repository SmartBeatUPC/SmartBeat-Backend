import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class RequestSuggestionDto{

    @ApiProperty()
    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(400)
    alternative: string;

    @ApiProperty()
    @IsString()
    @MinLength(1)
    @MaxLength(400)
    suggestion: string;
}

export class RequestGPTIdsDto{
    @ApiProperty()
    @IsBoolean()
    methodology: boolean;

    @ApiProperty()
    @IsNumber()
    patientId: number;

    @ApiProperty()
    @IsNumber()
    medicalInformationId: number;
}