import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MinLength, MaxLength, IsNumber } from "class-validator";

export class RequestDoctorDto{

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(50)
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(50)
    lastName: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    age: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(20)
    dni: string;

    @ApiProperty()
    @IsString()
    @MinLength(0)
    @MaxLength(20)
    phone: string;

    @ApiProperty()
    @IsString()
    @MinLength(0)
    @MaxLength(20)
    gender: string;

    /*@ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    userId: number;*/
    
}