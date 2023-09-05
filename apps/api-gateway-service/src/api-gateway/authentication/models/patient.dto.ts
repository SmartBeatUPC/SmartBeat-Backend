import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MinLength, MaxLength, IsNumber } from "class-validator";

export class RequestPatientDto{

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(20)
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(15)
    lastName: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    age: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(10)
    dni: string;
    
    @ApiProperty()
    @IsString()
    @MinLength(0)
    @MaxLength(15)
    phone: string;

    @ApiProperty()
    @IsString()
    @MinLength(1)
    @MaxLength(30)
    nationality: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    userId: number;
}