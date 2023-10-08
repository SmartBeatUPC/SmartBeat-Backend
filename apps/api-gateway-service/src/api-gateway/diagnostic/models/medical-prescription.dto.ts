import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, MaxLength, IsDecimal, IsOptional } from "class-validator";

export class RequestMedicalPrescriptionDto{

    @ApiProperty()
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    medicament: string;

    @ApiProperty()
    @IsDecimal()
    dosage: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @MaxLength(50)
    via: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @MaxLength(50)
    frequency: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @MaxLength(50)
    duration: string;
}

export class RequestMedicalPrescriptionsDto{
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