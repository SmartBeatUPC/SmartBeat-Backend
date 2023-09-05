import { IsBoolean, IsDecimal } from "class-validator";

export class CreateMedicalInformationDto {

    @IsDecimal()
    bmi: number;

    @IsBoolean()
    sedentary: boolean;

    @IsBoolean()
    smoke: boolean;

    @IsBoolean()
    alcohol: boolean;
}
