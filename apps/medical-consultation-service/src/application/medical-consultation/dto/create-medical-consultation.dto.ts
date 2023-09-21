import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMedicalConsultationDto {


    @IsNumber()
    @IsNotEmpty()
    doctorId: number; 

    @IsNumber()
    @IsNotEmpty()
    patientId: number; 
}
