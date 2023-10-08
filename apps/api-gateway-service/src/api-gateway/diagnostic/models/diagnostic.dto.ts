import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from "class-validator";

export class RequestDiagnosticDto{

    @ApiProperty()
    @IsString()
    @MinLength(1)
    @MaxLength(500)
    diagnosticResult: string;
    
}