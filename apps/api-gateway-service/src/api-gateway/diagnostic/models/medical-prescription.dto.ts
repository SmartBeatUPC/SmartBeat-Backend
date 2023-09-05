import { IsString, MinLength, MaxLength, IsDecimal } from "class-validator";

export class RequestMedicalPrescriptionDto{

    @IsString()
    @MinLength(1)
    @MaxLength(50)
    medicament: string;

    @IsDecimal()
    dosage: number;
}