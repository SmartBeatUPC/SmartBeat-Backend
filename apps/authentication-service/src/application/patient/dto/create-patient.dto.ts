import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreatePatientDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(20)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(15)
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
    @MaxLength(15)
    phone: string;

    @IsString()
    @MinLength(1)
    @MaxLength(30)
    nationality: string;

    @IsNumber()
    @IsNotEmpty()
    userId: number;
}
