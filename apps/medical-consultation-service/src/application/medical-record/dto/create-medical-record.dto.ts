import { IsDate, IsNumber, IsOptional } from "class-validator";

export class CreateMedicalRecordDto {

    @IsOptional()
    @IsDate()
    recordDate: Date;
}
