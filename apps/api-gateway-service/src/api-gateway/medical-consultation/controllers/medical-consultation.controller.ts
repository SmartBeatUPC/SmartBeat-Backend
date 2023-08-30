import { Controller, UseFilters, Inject, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "src/api-gateway/util/http-exception.filter";
import { RequestMedicalConsultationDto } from "../models/medical-consultation.dto";

@ApiTags('MedicalConsultations')
@Controller('MedicalConsultation')
@UseFilters(new HttpExceptionFilter())
export class MedicalConsultationController {
  
    constructor(@Inject('MEDICAL_CONSULTATION_SERVICE') private MedicalConsultationService: ClientProxy) {}

    @Post()
    createMedicalConsultation(@Body() createMedicalConsultationDto: RequestMedicalConsultationDto) {
        return this.MedicalConsultationService.send({ cmd: 'createMedicalConsultation' }, createMedicalConsultationDto);
    }
  
    @Get()
    findAllMedicalConsultations() {
        return this.MedicalConsultationService.send({ cmd: 'findAllMedicalConsultations' }, '');
    }
  
    @Get(':id')
    findOneMedicalConsultation(@Param('id') id: number) {
        return this.MedicalConsultationService.send({ cmd: 'findOneMedicalConsultation' }, id);
    }
  
  
    @Patch(':id')
    updateMedicalConsultation(@Param('id') id: number, @Body() updateMedicalConsultationDto: RequestMedicalConsultationDto) {
        return this.MedicalConsultationService.send({ cmd: 'updateMedicalConsultation' }, {id, updateMedicalConsultationDto});
    }
  
    @Delete(':id')
    removeMedicalConsultation(@Param('id') id: number) {
        return this.MedicalConsultationService.send({ cmd: 'removeMedicalConsultation' }, id);
    }
}