import { Controller, UseFilters, Inject, Post, Body, Get, Param, Patch, Delete, ParseIntPipe } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "src/api-gateway/util/http-exception.filter";
import { RequestDoctorCenterDto } from "../models/doctor-center.dto";

@ApiTags('doctor centers')
@Controller('doctor-center')
@UseFilters(new HttpExceptionFilter())
export class DoctorCenterController {
  
    constructor(@Inject('AUTHENTICATION_SERVICE') private authenticationService: ClientProxy) {}

    @Post()
    createDoctorCenter(@Body() createDoctorCenterDto: RequestDoctorCenterDto) {
        return this.authenticationService.send({ cmd: 'createDoctorCenter' }, createDoctorCenterDto);
    }
  
    @Get()
    findAllDoctorCenters() {
        return this.authenticationService.send({ cmd: 'findAllDoctorCenters' }, '');
    }
  
    @Get(':id')
    findOneDoctorCenter(@Param('id', ParseIntPipe) id: number) {
        return this.authenticationService.send({ cmd: 'findOneDoctorCenter' }, id);
    }
  
    @Patch(':id')
    updateDoctorCenter(@Param('id', ParseIntPipe) id: number, @Body() updateDoctorCenterDto: RequestDoctorCenterDto) {
        return this.authenticationService.send({ cmd: 'updateDoctorCenter' }, {id, updateDoctorCenterDto});
    }
  
    @Delete(':id')
    removeDoctorCenter(@Param('id', ParseIntPipe) id: number) {
        return this.authenticationService.send({ cmd: 'removeDoctorCenter' }, id);
    }
}