import { Controller, UseFilters, Inject, Post, Body, Get, Param, Patch, Delete, ParseIntPipe } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "src/api-gateway/util/http-exception.filter";
import { RequestDoctorDto } from "../models/doctor.dto";

@ApiTags('doctors')
@Controller('doctor')
@UseFilters(new HttpExceptionFilter())
export class DoctorController {
  
    constructor(@Inject('AUTHENTICATION_SERVICE') private authenticationService: ClientProxy) {}

    @Post()
    createDoctor(@Body() createDoctorDto: RequestDoctorDto) {
        return this.authenticationService.send({ cmd: 'createDoctor' }, createDoctorDto);
    }
  
    @Get()
    findAllDoctors() {
        return this.authenticationService.send({ cmd: 'findAllDoctors' }, '');
    }
  
    @Get(':id')
    findOneDoctor(@Param('id', ParseIntPipe) id: number) {
        return this.authenticationService.send({ cmd: 'findOneDoctor' }, id);
    }
  
  
    @Patch(':id')
    updateDoctor(@Param('id', ParseIntPipe) id: number, @Body() updateDoctorDto: RequestDoctorDto) {
        return this.authenticationService.send({ cmd: 'updateDoctor' }, {id, updateDoctorDto});
    }
  
    @Delete(':id')
    removeDoctor(@Param('id', ParseIntPipe) id: number) {
        return this.authenticationService.send({ cmd: 'removeDoctor' }, id);
    }

    @Get(':id/doctor-center/:doctorCenterId')
    findDoctorCenterByIdAndDoctorId(@Param('id', ParseIntPipe) id: number, @Param('doctorCenterId', ParseIntPipe)doctorCenterId: number) {
        return this.authenticationService.send({ cmd: 'findDoctorCenterByIdAndDoctorId' }, {id, doctorCenterId});
    }

    @Get(':id/doctor-center')
    findAllDoctorCentersByDoctorId(@Param('id', ParseIntPipe) id: number) {
        return this.authenticationService.send({ cmd: 'findAllDoctorCentersByDoctorId' }, id);
    }
}