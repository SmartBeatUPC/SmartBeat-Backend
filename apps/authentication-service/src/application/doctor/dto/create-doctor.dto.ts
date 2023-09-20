import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateDoctorDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(50)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(50)
    lastName: string;

    @IsNumber()
    @IsNotEmpty()
    age: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(10)
    dni: string;

    @IsString()
    @MinLength(0)
    @MaxLength(20)
    phone: string;

    @IsString()
    @MinLength(0)
    @MaxLength(20)
    gender: string;

    /*@IsNumber()
    @IsNotEmpty()
    userId: number;*/
}
