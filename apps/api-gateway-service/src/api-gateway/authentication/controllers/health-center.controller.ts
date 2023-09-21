import { Controller, UseFilters, Inject, Post, Body, Get, Param, Patch, Delete, ParseIntPipe } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "src/api-gateway/util/http-exception.filter";
import { RequestHealthCenterDto } from "../models/health-center.dto";

@ApiTags('health centers')
@Controller('health-center')
@UseFilters(new HttpExceptionFilter())
export class HealthCenterController {
  
    constructor(@Inject('AUTHENTICATION_SERVICE') private authenticationService: ClientProxy) {}

    @Post()
    createHealthCenter(@Body() createHealthCenterDto: RequestHealthCenterDto) {
        return this.authenticationService.send({ cmd: 'createHealthCenter' }, createHealthCenterDto);
    }
  
    @Get()
    findAllHealthCenters() {
        return this.authenticationService.send({ cmd: 'findAllHealthCenters' }, '');
    }
  
    @Get(':id')
    findOneHealthCenter(@Param('id', ParseIntPipe) id: number) {
        return this.authenticationService.send({ cmd: 'findOneHealthCenter' }, id);
    }
  
  
    @Patch(':id')
    updateHealthCenter(@Param('id', ParseIntPipe) id: number, @Body() updateHealthCenterDto: RequestHealthCenterDto) {
        return this.authenticationService.send({ cmd: 'updateHealthCenter' }, {id, updateHealthCenterDto});
    }
  
    @Delete(':id')
    removeHealthCenter(@Param('id', ParseIntPipe) id: number) {
        return this.authenticationService.send({ cmd: 'removeHealthCenter' }, id);
    }

    @Get(':id/doctor-center/:doctorCenterId')
    findDoctorCenterByIdAndHealthCenterId(@Param('id', ParseIntPipe) id: number, @Param('doctorCenterId', ParseIntPipe)doctorCenterId: number) {
        return this.authenticationService.send({ cmd: 'findDoctorCenterByIdAndHealthCenterId' }, {id, doctorCenterId});
    }

    @Get(':id/doctor-center')
    findAllDoctorCentersByHealthCenterId(@Param('id', ParseIntPipe) id: number) {
        return this.authenticationService.send({ cmd: 'findAllDoctorCentersByHealthCenterId' }, id);
    }
}