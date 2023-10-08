import { Controller, UseFilters, Inject, Post, Body, Get, Param, Patch, Delete, ParseIntPipe } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "src/api-gateway/util/http-exception.filter";
import { RequestBmiDto, RequestMedicalInformationDto } from "../models/medical-information.dto";
import { RequestPathologiesDto, RequestPathologyDto } from "../models/pathology.dto";
import { RequestPpgDto } from "../models/ppg.dto";

@ApiTags('medical informations')
@Controller('medical-information')
@UseFilters(new HttpExceptionFilter())
export class MedicalInformationController {
  
    constructor(@Inject('MEDICAL_INFORMATION_SERVICE') private medicalInformationService: ClientProxy) {}
  
    @Get()
    findAllMedicalInformations() {
        return this.medicalInformationService.send({ cmd: 'findAllMedicalInformations' }, '');
    }
  
    @Get(':id')
    findOneMedicalInformation(@Param('id', ParseIntPipe) id: number) {
        return this.medicalInformationService.send({ cmd: 'findOneMedicalInformation' }, id);
    }
  
  
    @Patch(':id')
    updateMedicalInformation(@Param('id', ParseIntPipe) id: number, @Body() updateMedicalInformationDto: RequestMedicalInformationDto) {
        return this.medicalInformationService.send({ cmd: 'updateMedicalInformation' }, {id, updateMedicalInformationDto});
    }
  
    @Delete(':id')
    removeMedicalInformation(@Param('id', ParseIntPipe) id: number) {
        return this.medicalInformationService.send({ cmd: 'removeMedicalInformation' }, id);
    }

    @Post('/BMI')
    calculateBMI(@Body() bmi: RequestBmiDto) {
        return this.medicalInformationService.send({ cmd: 'calculateBMI' }, bmi);
    }

    //Pathology
    @Post(':id/pathology')
    createPathology(@Param('id', ParseIntPipe) id: number, @Body() createPathologyDto: RequestPathologyDto) {
        return this.medicalInformationService.send({ cmd: 'createPathology' }, {id, createPathologyDto});
    }

    @Post(':id/pathologies')
    createPathologies(@Param('id', ParseIntPipe) id: number, @Body() pathologies: RequestPathologiesDto) {
        return this.medicalInformationService.send({ cmd: 'registerPathologiesByMedicalInformationId' }, {id, pathologies});
    }

    //PPG
    @Post(':id/ppg')
    createPpg(@Param('id', ParseIntPipe) id: number, @Body() createPpgDto: RequestPpgDto) {
        return this.medicalInformationService.send({ cmd: 'createPpg' }, {id, createPpgDto});
    }

    //Complete Medical Information
    @Get(':id/complete')
    getCompleteMedicalInformationById(@Param('id', ParseIntPipe) id: number) {
        return this.medicalInformationService.send({ cmd: 'getCompleteMedicalInformationById' }, id);
    }
}