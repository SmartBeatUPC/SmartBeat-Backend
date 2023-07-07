import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiagnosticService } from './diagnostic.service';
import { CreateDiagnosticDto } from './dto/create-diagnostic.dto';
import { UpdateDiagnosticDto } from './dto/update-diagnostic.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('diagnostic')
export class DiagnosticController {
  constructor(private readonly diagnosticService: DiagnosticService) {}

  @MessagePattern('createDiagnostic')
  create(@Payload() createDiagnosticDto: CreateDiagnosticDto) {
    return this.diagnosticService.create(createDiagnosticDto);
  }

  @MessagePattern('findAllDiagnostic')
  findAll() {
    return this.diagnosticService.findAll();
  }

  @MessagePattern('findOneDiagnosticById')
  findOne(@Param('id') id: string) {
    return this.diagnosticService.findOne(+id);
  }

  @MessagePattern('updateDiagnostic')
  update(@Param('id') id: string, @Body() updateDiagnosticDto: UpdateDiagnosticDto) {
    return this.diagnosticService.update(+id, updateDiagnosticDto);
  }

  @MessagePattern('deleteDiagnostic')
  remove(@Param('id') id: string) {
    return this.diagnosticService.remove(+id);
  }
}
