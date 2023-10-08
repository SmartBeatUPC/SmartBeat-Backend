import { Controller, UseFilters, Inject, Post, Body, Get, Param, Patch, Delete, ParseIntPipe, ValidationPipe } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "src/api-gateway/util/http-exception.filter";
import { RequestMedicalConsultationDto } from "../models/medical-consultation.dto";
import { RequestMedicalRecordAndInformationDto, RequestMedicalRecordDto } from "../models/medical-record.dto";


@ApiTags('medical consultations')
@Controller('medical-consultation')
@UseFilters(new HttpExceptionFilter())
export class MedicalConsultationController {
  
    constructor(@Inject('MEDICAL_CONSULTATION_SERVICE') private medicalConsultationService: ClientProxy,
    @Inject('MEDICAL_INFORMATION_SERVICE') private medicalInformationService: ClientProxy) {}

    @Post()
    createMedicalConsultation(@Body() createMedicalConsultationDto: RequestMedicalConsultationDto) {
        return this.medicalConsultationService.send({ cmd: 'createMedicalConsultation' }, createMedicalConsultationDto);
    }
  
    @Get()
    findAllMedicalConsultations() {
        return this.medicalConsultationService.send({ cmd: 'findAllMedicalConsultations' }, '');
    }
  
    @Get(':id')
    findOneMedicalConsultation(@Param('id', ParseIntPipe) id: number) {
        return this.medicalConsultationService.send({ cmd: 'findOneMedicalConsultation' }, id);
    }
  
  
    @Patch(':id')
    updateMedicalConsultation(@Param('id', ParseIntPipe) id: number, @Body() updateMedicalConsultationDto: RequestMedicalConsultationDto) {
        return this.medicalConsultationService.send({ cmd: 'updateMedicalConsultation' }, {id, updateMedicalConsultationDto});
    }
  
    @Delete(':id')
    removeMedicalConsultation(@Param('id', ParseIntPipe) id: number) {
        return this.medicalConsultationService.send({ cmd: 'removeMedicalConsultation' }, id);
    }

    //Medical Record
    /*@Post(':id/medical-record-prev')
    createMedicalRecord(@Param('id', ParseIntPipe) id: number, @Body() createMedicalRecordDto: RequestMedicalRecordDto) {
        return this.medicalConsultationService.send({ cmd: 'createMedicalRecord' }, {id,createMedicalRecordDto});
    }*/

    @Get(':id/medical-record/')
    findAllMedicalRecordsByMedicalConsultationId(@Param('id',ParseIntPipe) id: number) {
        return this.medicalConsultationService.send({ cmd: 'findAllMedicalRecordsByMedicalConsultationId' }, id);
    }

    @Get(':id/medical-record/:recordId')
    findOneMedicalRecordByIdAndMedicalConsultationId(@Param('id', ParseIntPipe) id: number,@Param('recordId', ParseIntPipe) recordId: number ) {
        return this.medicalConsultationService.send({ cmd: 'findOneMedicalRecordByIdAndMedicalConsultationId' }, {id,recordId});
    }

    //Medical Record & Medical Information
    @Post(':id/medical-record')
    createMedicalRecordAndMedicalInformation(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) requestMedicalRecordAndInformation: RequestMedicalRecordAndInformationDto) {
        return this.medicalInformationService.send({ cmd: 'createMedicalRecordAndMedicalInformation' },{id, requestMedicalRecordAndInformation});
    }

    //PPGs
    @Get(':id/ppgs/')
    findAllPPGByMedicalConsultationId(@Param('id',ParseIntPipe) id: number) {
        return this.medicalInformationService.send({ cmd: 'findAllPPGByMedicalConsultationId' }, id);
    }

}