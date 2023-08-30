import { Controller, UseFilters, Inject, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "src/api-gateway/util/http-exception.filter";
import { RequestDiagnosticDto } from "../models/diagnostic.dto";

@ApiTags('Diagnostics')
@Controller('Diagnostic')
@UseFilters(new HttpExceptionFilter())
export class DiagnosticController {
  
    constructor(@Inject('DIAGNOSTIC_SERVICE') private DiagnosticService: ClientProxy) {}

    @Post()
    createDiagnostic(@Body() createDiagnosticDto: RequestDiagnosticDto) {
        return this.DiagnosticService.send({ cmd: 'createDiagnostic' }, createDiagnosticDto);
    }
  
    @Get()
    findAllDiagnostics() {
        return this.DiagnosticService.send({ cmd: 'findAllDiagnostics' }, '');
    }
  
    @Get(':id')
    findOneDiagnostic(@Param('id') id: number) {
        return this.DiagnosticService.send({ cmd: 'findOneDiagnostic' }, id);
    }
  
  
    @Patch(':id')
    updateDiagnostic(@Param('id') id: number, @Body() updateDiagnosticDto: RequestDiagnosticDto) {
        return this.DiagnosticService.send({ cmd: 'updateDiagnostic' }, {id, updateDiagnosticDto});
    }
  
    @Delete(':id')
    removeDiagnostic(@Param('id') id: number) {
        return this.DiagnosticService.send({ cmd: 'removeDiagnostic' }, id);
    }
}