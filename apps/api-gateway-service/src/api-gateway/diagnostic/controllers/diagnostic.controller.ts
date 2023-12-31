import { Controller, UseFilters, Inject, Post, Body, Get, Param, Patch, Delete, ParseIntPipe } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "src/api-gateway/util/http-exception.filter";
import { RequestDiagnosticDto } from "../models/diagnostic.dto";
import { RequestMedicalPrescriptionDto, RequestMedicalPrescriptionsDto } from "../models/medical-prescription.dto";

@ApiTags('diagnostics')
@Controller('diagnostic')
@UseFilters(new HttpExceptionFilter())
export class DiagnosticController {
  
    constructor(@Inject('DIAGNOSTIC_SERVICE') private diagnosticService: ClientProxy) {}
  
    @Get()
    findAllDiagnostics() {
        return this.diagnosticService.send({ cmd: 'findAllDiagnostics' }, '');
    }
  
    @Get(':id')
    findOneDiagnostic(@Param('id', ParseIntPipe) id: number) {
        return this.diagnosticService.send({ cmd: 'findOneDiagnostic' }, id);
    }
  
  
    @Patch(':id')
    updateDiagnostic(@Param('id', ParseIntPipe) id: number, @Body() updateDiagnosticDto: RequestDiagnosticDto) {
        return this.diagnosticService.send({ cmd: 'updateDiagnostic' }, {id, updateDiagnosticDto});
    }
  

    //Medical Prescription
    @Post(':id/medical-prescription')
    createMedicalPrescription(@Param('id', ParseIntPipe) id: number,@Body() createMedicalPrescriptionDto: RequestMedicalPrescriptionDto) {
        return this.diagnosticService.send({ cmd: 'createMedicalPrescription' },{id, createMedicalPrescriptionDto});
    }

    @Post(':id/medical-prescriptions')
    registerMedicalPrescriptionsByDiagnosticId(@Param('id', ParseIntPipe) id: number, @Body() medicalPrescriptions: RequestMedicalPrescriptionsDto) {
        return this.diagnosticService.send({ cmd: 'registerMedicalPrescriptionsByDiagnosticId' },{id, medicalPrescriptions});
    }

    @Get(':id/medical-prescriptions')
    findAllMedicalPrescriptionsByDiagnosticId(@Param('id', ParseIntPipe) id: number) {
        return this.diagnosticService.send({ cmd: 'findAllMedicalPrescriptionsByDiagnosticId' }, id);
    }

    @Get(':id/medical-prescription/:medicalPrescriptionId')
    findOneMedicalPrescriptionByIdByDiagnosticId(@Param('id', ParseIntPipe) id: number, @Param('medicalPrescriptionId', ParseIntPipe) medicalPrescriptionId: number) {
        return this.diagnosticService.send({ cmd: 'findOneMedicalPrescriptionByIdAndDiagnosticId' }, {id, medicalPrescriptionId});
    }
    
}