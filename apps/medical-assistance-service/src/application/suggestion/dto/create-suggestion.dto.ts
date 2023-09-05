import { IsString, IsNumber, IsNotEmpty } from "class-validator";

export class CreateSuggestionDto {

    @IsString()
    alternative: string;

    @IsString()
    suggestion: string;

}
