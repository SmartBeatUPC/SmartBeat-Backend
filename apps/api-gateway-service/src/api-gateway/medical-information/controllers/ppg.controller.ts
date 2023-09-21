import { Controller, UseFilters, Inject, Post, Body, Get, Param, Patch, Delete, ParseIntPipe } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "src/api-gateway/util/http-exception.filter";
import { RequestPpgDto } from "../models/ppg.dto";

@ApiTags('ppgs')
@Controller('ppg')
@UseFilters(new HttpExceptionFilter())
export class PpgController {
  
    constructor(@Inject('MEDICAL_INFORMATION_SERVICE') private medicalInformationService: ClientProxy) {}
  
    @Get()
    findAllPpgs() {
        return this.medicalInformationService.send({ cmd: 'findAllPpgs' }, '');
    }
  
    @Get(':id')
    findOnePpg(@Param('id', ParseIntPipe) id: number) {
        return this.medicalInformationService.send({ cmd: 'findOnePpg' }, id);
    }
  
  
    @Patch(':id')
    updatePpg(@Param('id', ParseIntPipe) id: number, @Body() updatePpgDto: RequestPpgDto) {
        return this.medicalInformationService.send({ cmd: 'updatePpg' }, {id, updatePpgDto});
    }
  
}