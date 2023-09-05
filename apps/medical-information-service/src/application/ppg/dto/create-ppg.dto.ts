import { IsDecimal, IsNumber } from "class-validator";

export class CreatePpgDto {

    @IsDecimal()
    bloodPressureSistolic: number;

    @IsDecimal()
    bloodPressureDiastolic: number;

    @IsNumber()
    heartRate: number;
}
