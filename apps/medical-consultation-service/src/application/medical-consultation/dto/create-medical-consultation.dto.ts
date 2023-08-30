import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMedicalConsultationDto {


    @IsString()
    @IsNotEmpty()
    medicalDate: Date;

    @IsNumber()
    @IsNotEmpty()
    doctor_id: number; 

    @IsNumber()
    @IsNotEmpty()
    patient_id: number; 
}
