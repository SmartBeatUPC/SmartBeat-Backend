import { IsString } from "class-validator";

export class CreatePathologyDto {
    @IsString()
    pathology:string;
}
