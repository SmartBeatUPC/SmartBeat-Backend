import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, IsBoolean } from "class-validator";
import { RequestDoctorDto } from "./doctor.dto";
import { RequestPatientDto } from "./patient.dto";

export class RequestUserDto{

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

    // @ApiProperty()
    // @IsBoolean()
    // isDoctor: boolean;
}

export class RequestVerifyUserDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
 
}

export class RequestUserDoctorDto{

    @ApiProperty()
    requestUserDto: RequestUserDto;

    @ApiProperty()
    requestAditionalDataDto: RequestDoctorDto;

}

export class RequestUserPatientDto{

    @ApiProperty()
    requestUserDto: RequestUserDto;

    @ApiProperty()
    requestAditionalDataDto: RequestPatientDto;

}