import { Controller, UseFilters, Inject, Post, Body, Get, Param, Patch, Delete, ParseIntPipe } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "src/api-gateway/util/http-exception.filter";
import { RequestPathologyDto } from "../models/pathology.dto";

@ApiTags('pathologies')
@Controller('pathology')
@UseFilters(new HttpExceptionFilter())
export class PathologyController {
  
    constructor(@Inject('MEDICAL_INFORMATION_SERVICE') private medicalInformationService: ClientProxy) {}
  
    @Get()
    findAllPathologies() {
        return this.medicalInformationService.send({ cmd: 'findAllPathologies' }, '');
    }
  
    @Get(':id')
    findOnePathology(@Param('id', ParseIntPipe) id: number) {
        return this.medicalInformationService.send({ cmd: 'findOnePathology' }, id);
    }
  
  
    @Patch(':id')
    updatePathology(@Param('id', ParseIntPipe) id: number, @Body() updatePathologyDto: RequestPathologyDto) {
        return this.medicalInformationService.send({ cmd: 'updatePathology' }, {id, updatePathologyDto});
    }
  
}