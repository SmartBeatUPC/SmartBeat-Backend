import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNotEmpty } from "class-validator";

export class RequestDoctorCenterDto{

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    doctorId: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    healthCenterId: number;
    
}