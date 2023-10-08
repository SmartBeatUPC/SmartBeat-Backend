import { IsDecimal, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateMedicalPrescriptionDto {

    @IsString()
    @MinLength(1)
    @MaxLength(50)
    medicament: string;

    @IsDecimal()
    dosage: number;

    @IsString()
    @IsOptional()
    @MaxLength(50)
    via: string;

    @IsString()
    @IsOptional()
    @MaxLength(50)
    frequency: string;

    @IsString()
    @IsOptional()
    @MaxLength(50)
    duration: string;
}
