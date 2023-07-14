import { Controller, Body, Param } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateDiagnosticDto, DiagnosticServiceImpl, UpdateDiagnosticDto } from 'src/application/index.application';

@Controller('diagnostic')
export class DiagnosticController {
  constructor(private readonly diagnosticService: DiagnosticServiceImpl) {}

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
