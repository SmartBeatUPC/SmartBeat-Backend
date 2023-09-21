import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, IsBoolean } from "class-validator";

export class CreateUserDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(10)
    @IsNotEmpty()
    password: string;

    @IsBoolean()
    isDoctor: boolean;
}
