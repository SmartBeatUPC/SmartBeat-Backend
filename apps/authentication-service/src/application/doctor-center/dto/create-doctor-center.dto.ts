import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateDoctorCenterDto {

    @IsNumber()
    @IsNotEmpty()
    doctorId: number;

    @IsNumber()
    @IsNotEmpty()
    healthCenterId: number;
}
