import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateHealthCenterDto {

    @IsString()
    @MinLength(1)
    @MaxLength(50)
    nameCenter: string;

    @IsString()
    @MinLength(1)
    @MaxLength(80)
    addressCenter: string;
}
