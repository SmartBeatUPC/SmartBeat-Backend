import { Controller, UseFilters, Inject, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "src/api-gateway/util/http-exception.filter";
import { RequestDoctorDto } from "../models/doctor.dto";

@ApiTags('Doctors')
@Controller('Doctor')
@UseFilters(new HttpExceptionFilter())
export class DoctorController {
  
    constructor(@Inject('AUTHENTICATION_SERVICE') private DoctorService: ClientProxy) {}

    @Post()
    createDoctor(@Body() createDoctorDto: RequestDoctorDto) {
        return this.DoctorService.send({ cmd: 'createDoctor' }, createDoctorDto);
    }
  
    @Get()
    findAllDoctors() {
        return this.DoctorService.send({ cmd: 'findAllDoctors' }, '');
    }
  
    @Get(':id')
    findOneDoctor(@Param('id') id: number) {
        return this.DoctorService.send({ cmd: 'findOneDoctor' }, id);
    }
  
  
    @Patch(':id')
    updateDoctor(@Param('id') id: number, @Body() updateDoctorDto: RequestDoctorDto) {
        return this.DoctorService.send({ cmd: 'updateDoctor' }, {id, updateDoctorDto});
    }
  
    @Delete(':id')
    removeDoctor(@Param('id') id: number) {
        return this.DoctorService.send({ cmd: 'removeDoctor' }, id);
    }
}