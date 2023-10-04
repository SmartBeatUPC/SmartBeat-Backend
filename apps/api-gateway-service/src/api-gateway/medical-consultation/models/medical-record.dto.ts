import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsDecimal, IsOptional } from "class-validator";
import { RequestMedicalInformationDto } from "src/api-gateway/medical-information/models/medical-information.dto";

export class RequestMedicalRecordDto{
    @ApiProperty()
    @IsOptional()
    @IsDate()
    recordDate: Date;
}

export class RequestMedicalRecordAndInformationDto{

    @ApiProperty()
    requestMedicalRecordDto: RequestMedicalRecordDto;

    @ApiProperty()
    requestMedicalInformationDto: RequestMedicalInformationDto;
}