import { IsDecimal, IsString, MaxLength, MinLength } from "class-validator";

export class CreateMedicalPrescriptionDto {

    @IsString()
    @MinLength(1)
    @MaxLength(50)
    medicament: string;

    @IsDecimal()
    dosage: number;
}
