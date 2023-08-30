import { IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateDoctorDto {

    @IsNumber()
    id: number;

    @IsString()
    @MinLength(1)
    @MaxLength(20)
    name: string;

    @IsString()
    @MinLength(1)
    @MaxLength(15)
    lastName: string;

    @IsString()
    age: number;

    @IsString()
    @MinLength(8)
    @MaxLength(10)
    dni: string;

    @IsNumber()
    userId: number;
}
