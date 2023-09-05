import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, MaxLength } from "class-validator";

export class RequestHealthCenterDto{

    @ApiProperty()
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    nameCenter: string;

    @ApiProperty()
    @IsString()
    @MinLength(1)
    @MaxLength(80)
    addressCenter: string;
}