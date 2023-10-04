import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

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