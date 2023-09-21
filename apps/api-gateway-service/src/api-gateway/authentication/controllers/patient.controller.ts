import { Controller, UseFilters, Inject, Post, Body, Get, Param, Patch, Delete, ParseIntPipe } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "src/api-gateway/util/http-exception.filter";
import { RequestPatientDto } from "../models/patient.dto";

@ApiTags('patients')
@Controller('patient')
@UseFilters(new HttpExceptionFilter())
export class PatientController {
  
    constructor(@Inject('AUTHENTICATION_SERVICE') private authenticationService: ClientProxy) {}

    /*@Post()
    createPatient(@Body() createPatientDto: RequestPatientDto) {
        return this.authenticationService.send({ cmd: 'createPatient' }, createPatientDto);
    }*/
  
    @Get()
    findAllPatients() {
        return this.authenticationService.send({ cmd: 'findAllPatients' }, '');
    }
  
    @Get(':id')
    findOnePatient(@Param('id', ParseIntPipe) id: number) {
        return this.authenticationService.send({ cmd: 'findOnePatient' }, id);
    }
  
  
    @Patch(':id')
    updatePatient(@Param('id', ParseIntPipe) id: number, @Body() updatePatientDto: RequestPatientDto) {
        return this.authenticationService.send({ cmd: 'updatePatient' }, {id, updatePatientDto});
    }
  
    @Delete(':id')
    removePatient(@Param('id', ParseIntPipe) id: number) {
        return this.authenticationService.send({ cmd: 'removePatient' }, id);
    }
}