import { Controller, UseFilters, Inject, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "src/api-gateway/util/http-exception.filter";
import { RequestHealthCenterDto } from "../models/health-center.dto";

@ApiTags('HealthCenters')
@Controller('HealthCenter')
@UseFilters(new HttpExceptionFilter())
export class HealthCenterController {
  
    constructor(@Inject('AUTHENTICATION_SERVICE') private HealthCenterService: ClientProxy) {}

    @Post()
    createHealthCenter(@Body() createHealthCenterDto: RequestHealthCenterDto) {
        return this.HealthCenterService.send({ cmd: 'createHealthCenter' }, createHealthCenterDto);
    }
  
    @Get()
    findAllHealthCenters() {
        return this.HealthCenterService.send({ cmd: 'findAllHealthCenters' }, '');
    }
  
    @Get(':id')
    findOneHealthCenter(@Param('id') id: number) {
        return this.HealthCenterService.send({ cmd: 'findOneHealthCenter' }, id);
    }
  
  
    @Patch(':id')
    updateHealthCenter(@Param('id') id: number, @Body() updateHealthCenterDto: RequestHealthCenterDto) {
        return this.HealthCenterService.send({ cmd: 'updateHealthCenter' }, {id, updateHealthCenterDto});
    }
  
    @Delete(':id')
    removeHealthCenter(@Param('id') id: number) {
        return this.HealthCenterService.send({ cmd: 'removeHealthCenter' }, id);
    }
}