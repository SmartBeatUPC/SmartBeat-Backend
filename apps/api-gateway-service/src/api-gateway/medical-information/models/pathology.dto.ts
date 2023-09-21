import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RequestPathologyDto{

    @ApiProperty()
    @IsString()
    pathology:string;
}