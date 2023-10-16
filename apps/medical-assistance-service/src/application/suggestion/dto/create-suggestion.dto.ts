import { IsString } from "class-validator";

export class CreateSuggestionDto {

    @IsString()
    suggestion: string;

}
