import { Controller, Body, Param } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateDiagnosticDto, DiagnosticServiceImpl, UpdateDiagnosticDto } from 'src/application/index.application';

@Controller('diagnostic')
export class DiagnosticController {
  constructor(private readonly diagnosticService: DiagnosticServiceImpl) {}

  @MessagePattern({cmd: 'createDiagnostic'})
  create(data: {id: number, createDiagnosticDto: CreateDiagnosticDto}) {
    const {id, createDiagnosticDto} = data
    return this.diagnosticService.create(id, createDiagnosticDto);
  }

  @MessagePattern({cmd: 'findAllDiagnostics'})
  findAll() {
    return this.diagnosticService.findAll();
  }

  @MessagePattern({cmd: 'findOneDiagnosticById'})
  findOne(id: number) {
    return this.diagnosticService.findOne(id);
  }

  @MessagePattern({cmd: 'findOneDiagnosticByMedicalRecordId'})
  findByMedicalRecord(id: number) {
    return this.diagnosticService.findByMedicalRecordId(id);
  }

  @MessagePattern({cmd: 'updateDiagnostic'})
  update(data: {id: number, updateDiagnosticDto: UpdateDiagnosticDto}) {
    const {id,updateDiagnosticDto} = data
    return this.diagnosticService.update(id, updateDiagnosticDto);
  }

}
