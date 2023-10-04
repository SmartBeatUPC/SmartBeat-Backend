import { IsString, IsNumber, IsNotEmpty, IsOptional } from "class-validator";

export class CreateSuggestionDto {

    @IsString()
    @IsOptional()
    alternative: string;

    @IsString()
    suggestion: string;

}
