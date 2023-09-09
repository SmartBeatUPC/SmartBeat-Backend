import { IsBoolean, IsDecimal } from "class-validator";

export class CreateMedicalInformationDto {

    @IsDecimal()
    height: number;

    @IsDecimal()
    weight: number;

    @IsDecimal()
    bmi: number;

    @IsBoolean()
    sedentary: boolean;

    @IsBoolean()
    smoke: boolean;

    @IsBoolean()
    alcohol: boolean;
}
