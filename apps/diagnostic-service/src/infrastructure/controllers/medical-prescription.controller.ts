import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateMedicalPrescriptionDto, MedicalPrescriptionServiceImpl, UpdateMedicalPrescriptionDto } from 'src/application/index.application';



@Controller('medical-prescription')
export class MedicalPrescriptionController {
  constructor(private readonly medicalPrescriptionService: MedicalPrescriptionServiceImpl) {}

  @MessagePattern({cmd: 'createMedicalPrescription'})
  create(data: {diagnosticId: number, createMedicalPrescriptionDto: CreateMedicalPrescriptionDto}) {
    const {diagnosticId, createMedicalPrescriptionDto} = data
    return this.medicalPrescriptionService.create(diagnosticId, createMedicalPrescriptionDto);
  }

  @MessagePattern({cmd: 'findAllMedicalPrescription'})
  findAll() {
    return this.medicalPrescriptionService.findAll();
  }

  @MessagePattern({cmd: 'findOneMedicalPrescription'})
  findOne(id: number) {
    return this.medicalPrescriptionService.findOne(id);
  }

  @MessagePattern({cmd: 'findOneMedicalPrescriptionByDiagnosticId'})
  findByDiagnosticId(diagnosticId: number) {
    return this.medicalPrescriptionService.findByDiagnosticId(diagnosticId);
  }

  @MessagePattern({cmd: 'updateMedicalPrescription'})
  update(data: {id, updateMedicalPrescriptionDto: UpdateMedicalPrescriptionDto}) {
    const {id, updateMedicalPrescriptionDto} = data
    return this.medicalPrescriptionService.update(id, updateMedicalPrescriptionDto);
  }
}
