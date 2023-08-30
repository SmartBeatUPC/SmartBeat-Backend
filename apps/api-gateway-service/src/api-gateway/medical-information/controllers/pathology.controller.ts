import { Controller, UseFilters, Inject, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "src/api-gateway/util/http-exception.filter";
import { RequestPathologyDto } from "../models/pathology.dto";

@ApiTags('Pathologies')
@Controller('Pathology')
@UseFilters(new HttpExceptionFilter())
export class PathologyController {
  
    constructor(@Inject('MEDICAL_INFORMATION_SERVICE') private PathologyService: ClientProxy) {}

    @Post()
    createPathology(@Body() createPathologyDto: RequestPathologyDto) {
        return this.PathologyService.send({ cmd: 'createPathology' }, createPathologyDto);
    }
  
    @Get()
    findAllPathologys() {
        return this.PathologyService.send({ cmd: 'findAllPathologys' }, '');
    }
  
    @Get(':id')
    findOnePathology(@Param('id') id: number) {
        return this.PathologyService.send({ cmd: 'findOnePathology' }, id);
    }
  
  
    @Patch(':id')
    updatePathology(@Param('id') id: number, @Body() updatePathologyDto: RequestPathologyDto) {
        return this.PathologyService.send({ cmd: 'updatePathology' }, {id, updatePathologyDto});
    }
  
    @Delete(':id')
    removePathology(@Param('id') id: number) {
        return this.PathologyService.send({ cmd: 'removePathology' }, id);
    }
}