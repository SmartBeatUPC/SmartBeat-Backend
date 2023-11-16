import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from "class-validator";
import { RequestMedicalPrescriptionDto } from "./medical-prescription.dto";

export class RequestDiagnosticDto{

    @ApiProperty()
    @IsString()
    @MinLength(1)
    @MaxLength(500)
    diagnosticResult: string;
    
}

export class RequestCompleteDiagnosticDto{
    @ApiProperty()
    createDiagnosticDto: RequestDiagnosticDto;

    @ApiProperty({
        type: [RequestMedicalPrescriptionDto],
        example: [
          {
            medicament: 'string',
            dosage: 0,
            via: 'string',
            frequency: 'string',
            duration: 'string',
          },
          {
            medicament: 'string',
            dosage: 0,
            via: 'string',
            frequency: 'string',
            duration: 'string',
          },
        ],
      })
    medicalPrescriptions: RequestMedicalPrescriptionDto[];
}