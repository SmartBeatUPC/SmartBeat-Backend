import { Controller, UseFilters, Inject, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "src/api-gateway/util/http-exception.filter";
import { RequestMedicalRecordDto } from "../models/medical-record.dto";

@ApiTags('MedicalRecords')
@Controller('MedicalRecord')
@UseFilters(new HttpExceptionFilter())
export class MedicalRecordController {
  
    constructor(@Inject('MEDICAL_CONSULTATION_SERVICE') private MedicalRecordService: ClientProxy) {}

    @Post()
    createMedicalRecord(@Body() createMedicalRecordDto: RequestMedicalRecordDto) {
        return this.MedicalRecordService.send({ cmd: 'createMedicalRecord' }, createMedicalRecordDto);
    }
  
    @Get()
    findAllMedicalRecords() {
        return this.MedicalRecordService.send({ cmd: 'findAllMedicalRecords' }, '');
    }
  
    @Get(':id')
    findOneMedicalRecord(@Param('id') id: number) {
        return this.MedicalRecordService.send({ cmd: 'findOneMedicalRecord' }, id);
    }
  
  
    @Patch(':id')
    updateMedicalRecord(@Param('id') id: number, @Body() updateMedicalRecordDto: RequestMedicalRecordDto) {
        return this.MedicalRecordService.send({ cmd: 'updateMedicalRecord' }, {id, updateMedicalRecordDto});
    }
  
    @Delete(':id')
    removeMedicalRecord(@Param('id') id: number) {
        return this.MedicalRecordService.send({ cmd: 'removeMedicalRecord' }, id);
    }
}