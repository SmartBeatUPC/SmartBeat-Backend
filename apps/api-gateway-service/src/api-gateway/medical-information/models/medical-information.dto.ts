import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDecimal } from "class-validator";

export class RequestMedicalInformationDto{

    @ApiProperty()
    @IsDecimal()
    bmi: number;

    @ApiProperty()
    @IsBoolean()
    sedentary: boolean;

    @ApiProperty()
    @IsBoolean()
    smoke: boolean;

    @ApiProperty()
    @IsBoolean()
    alcohol: boolean;
}