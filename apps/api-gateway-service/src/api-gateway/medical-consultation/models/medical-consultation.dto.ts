import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class RequestMedicalConsultationDto{


    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    doctorId: number; 

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    patientId: number; 
}