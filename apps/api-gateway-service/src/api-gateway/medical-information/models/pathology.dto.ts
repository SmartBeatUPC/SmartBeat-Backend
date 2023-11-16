import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RequestPathologyDto{

    @ApiProperty()
    @IsString()
    pathology:string;
}

export class RequestPathologiesDto{

    @ApiProperty({
        type: [RequestPathologyDto],
        example: [
          {
           pathology: 'string'
          },
          {
           pathology: 'string'
          }
        ],
      })
    pathologies: RequestPathologyDto[];
}