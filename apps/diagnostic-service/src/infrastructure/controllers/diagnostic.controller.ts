import { Controller, Body, Param } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateDiagnosticDto, DiagnosticServiceImpl, UpdateDiagnosticDto } from 'src/application/index.application';

@Controller('diagnostic')
export class DiagnosticController {
  constructor(private readonly diagnosticService: DiagnosticServiceImpl) {}

  @MessagePattern({cmd: 'createDiagnostic'})
  create(data: {consultationId: number, createDiagnosticDto: CreateDiagnosticDto}) {
    const {consultationId, createDiagnosticDto} = data
    return this.diagnosticService.create(consultationId, createDiagnosticDto);
  }

  @MessagePattern({cmd: 'findAllDiagnostic'})
  findAll() {
    return this.diagnosticService.findAll();
  }

  @MessagePattern({cmd: 'findOneDiagnosticById'})
  findOne(id: number) {
    return this.diagnosticService.findOne(id);
  }

  @MessagePattern({cmd: 'findOneDiagnosticByMedicalConsultationId'})
  findByMedicalConsultation(consultationId: number) {
    return this.diagnosticService.findByMedicalConsultationId(consultationId);
  }

  @MessagePattern({cmd: 'updateDiagnostic'})
  update(data: {id: number, updateDiagnosticDto: UpdateDiagnosticDto}) {
    const {id,updateDiagnosticDto} = data
    return this.diagnosticService.update(id, updateDiagnosticDto);
  }

}
