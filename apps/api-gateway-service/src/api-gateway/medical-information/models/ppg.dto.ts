import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsNumber } from "class-validator";

export class RequestPpgDto{

    @ApiProperty()
    @IsDecimal()
    bloodPressureSistolic: number;

    @ApiProperty()
    @IsDecimal()
    bloodPressureDiastolic: number;

    @ApiProperty()
    @IsNumber()
    heartRate: number;
}