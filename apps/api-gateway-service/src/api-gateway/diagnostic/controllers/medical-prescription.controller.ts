import { Controller, UseFilters, Inject, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "src/api-gateway/util/http-exception.filter";
import { RequestMedicalPrescriptionDto } from "../models/medical-prescription.dto";

@ApiTags('medical prescriptions')
@Controller('medical-prescription')
@UseFilters(new HttpExceptionFilter())
export class MedicalPrescriptionController {
  
    constructor(@Inject('DIAGNOSTIC_SERVICE') private diagnosticService: ClientProxy) {}
  
    @Get()
    findAllMedicalPrescriptions() {
        return this.diagnosticService.send({ cmd: 'findAllMedicalPrescriptions' }, '');
    }
  
    @Get(':id')
    findOneMedicalPrescription(@Param('id') id: number) {
        return this.diagnosticService.send({ cmd: 'findOneMedicalPrescription' }, id);
    }
  
  
    @Patch(':id')
    updateMedicalPrescription(@Param('id') id: number, @Body() updateMedicalPrescriptionDto: RequestMedicalPrescriptionDto) {
        return this.diagnosticService.send({ cmd: 'updateMedicalPrescription' }, {id, updateMedicalPrescriptionDto});
    }
  
    @Delete(':id')
    removeMedicalPrescription(@Param('id') id: number) {
        return this.diagnosticService.send({ cmd: 'removeMedicalPrescription' }, id);
    }
}