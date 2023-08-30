import { Controller, UseFilters, Inject, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "src/api-gateway/util/http-exception.filter";
import { RequestMedicalInformationDto } from "../models/medical-information.dto";

@ApiTags('MedicalInformations')
@Controller('MedicalInformation')
@UseFilters(new HttpExceptionFilter())
export class MedicalInformationController {
  
    constructor(@Inject('MEDICAL_INFORMATION_SERVICE') private MedicalInformationService: ClientProxy) {}

    @Post()
    createMedicalInformation(@Body() createMedicalInformationDto: RequestMedicalInformationDto) {
        return this.MedicalInformationService.send({ cmd: 'createMedicalInformation' }, createMedicalInformationDto);
    }
  
    @Get()
    findAllMedicalInformations() {
        return this.MedicalInformationService.send({ cmd: 'findAllMedicalInformations' }, '');
    }
  
    @Get(':id')
    findOneMedicalInformation(@Param('id') id: number) {
        return this.MedicalInformationService.send({ cmd: 'findOneMedicalInformation' }, id);
    }
  
  
    @Patch(':id')
    updateMedicalInformation(@Param('id') id: number, @Body() updateMedicalInformationDto: RequestMedicalInformationDto) {
        return this.MedicalInformationService.send({ cmd: 'updateMedicalInformation' }, {id, updateMedicalInformationDto});
    }
  
    @Delete(':id')
    removeMedicalInformation(@Param('id') id: number) {
        return this.MedicalInformationService.send({ cmd: 'removeMedicalInformation' }, id);
    }
}