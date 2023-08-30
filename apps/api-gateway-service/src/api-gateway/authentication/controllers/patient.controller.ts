import { Controller, UseFilters, Inject, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "src/api-gateway/util/http-exception.filter";
import { RequestPatientDto } from "../models/patient.dto";

@ApiTags('Patients')
@Controller('Patient')
@UseFilters(new HttpExceptionFilter())
export class PatientController {
  
    constructor(@Inject('AUTHENTICATION_SERVICE') private PatientService: ClientProxy) {}

    @Post()
    createPatient(@Body() createPatientDto: RequestPatientDto) {
        return this.PatientService.send({ cmd: 'createPatient' }, createPatientDto);
    }
  
    @Get()
    findAllPatients() {
        return this.PatientService.send({ cmd: 'findAllPatients' }, '');
    }
  
    @Get(':id')
    findOnePatient(@Param('id') id: number) {
        return this.PatientService.send({ cmd: 'findOnePatient' }, id);
    }
  
  
    @Patch(':id')
    updatePatient(@Param('id') id: number, @Body() updatePatientDto: RequestPatientDto) {
        return this.PatientService.send({ cmd: 'updatePatient' }, {id, updatePatientDto});
    }
  
    @Delete(':id')
    removePatient(@Param('id') id: number) {
        return this.PatientService.send({ cmd: 'removePatient' }, id);
    }
}