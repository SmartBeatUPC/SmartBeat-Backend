import { Controller, UseFilters, Inject, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "src/api-gateway/util/http-exception.filter";
import { RequestDoctorCenterDto } from "../models/doctor-center.dto";

@ApiTags('DoctorCenters')
@Controller('DoctorCenter')
@UseFilters(new HttpExceptionFilter())
export class DoctorCenterController {
  
    constructor(@Inject('AUTHENTICATION_SERVICE') private DoctorCenterService: ClientProxy) {}

    @Post()
    createDoctorCenter(@Body() createDoctorCenterDto: RequestDoctorCenterDto) {
        return this.DoctorCenterService.send({ cmd: 'createDoctorCenter' }, createDoctorCenterDto);
    }
  
    @Get()
    findAllDoctorCenters() {
        return this.DoctorCenterService.send({ cmd: 'findAllDoctorCenters' }, '');
    }
  
    @Get(':id')
    findOneDoctorCenter(@Param('id') id: number) {
        return this.DoctorCenterService.send({ cmd: 'findOneDoctorCenter' }, id);
    }
  
  
    @Patch(':id')
    updateDoctorCenter(@Param('id') id: number, @Body() updateDoctorCenterDto: RequestDoctorCenterDto) {
        return this.DoctorCenterService.send({ cmd: 'updateDoctorCenter' }, {id, updateDoctorCenterDto});
    }
  
    @Delete(':id')
    removeDoctorCenter(@Param('id') id: number) {
        return this.DoctorCenterService.send({ cmd: 'removeDoctorCenter' }, id);
    }
}