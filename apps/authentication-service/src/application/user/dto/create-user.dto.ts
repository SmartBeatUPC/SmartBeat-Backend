import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, IsBoolean } from "class-validator";

export class CreateUserDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsBoolean()
    isDoctor: boolean;
}
