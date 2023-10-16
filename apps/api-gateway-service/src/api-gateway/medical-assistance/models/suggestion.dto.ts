import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class RequestSuggestionDto{

    @ApiProperty()
    @IsString()
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