import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, IsBoolean } from "class-validator";

export class RequestUserDto{

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    @MaxLength(10)
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsBoolean()
    isDoctor: boolean;
}

export class RequestVerifyUserDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    @MaxLength(10)
    @IsNotEmpty()
    password: string;
 
}