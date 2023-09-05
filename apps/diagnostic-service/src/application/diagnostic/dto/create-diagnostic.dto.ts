import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateDiagnosticDto {

    @IsString()
    @MinLength(1)
    @MaxLength(300)
    diagnosticResult: string;
}
