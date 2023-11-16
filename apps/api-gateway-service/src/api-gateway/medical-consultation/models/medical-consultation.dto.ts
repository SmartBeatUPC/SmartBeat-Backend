import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

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

export class RequestFilterLastMedicalInformationDto{
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    filter: number;
}