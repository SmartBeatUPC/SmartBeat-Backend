import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateMedicalPrescriptionDto, MedicalPrescriptionServiceImpl, UpdateMedicalPrescriptionDto } from 'src/application/index.application';



@Controller('medical-prescription')
export class MedicalPrescriptionController {
  constructor(private readonly medicalPrescriptionService: MedicalPrescriptionServiceImpl) {}

  @MessagePattern({cmd: 'createMedicalPrescription'})
  create(data: {id: number, createMedicalPrescriptionDto: CreateMedicalPrescriptionDto}) {
    const {id, createMedicalPrescriptionDto} = data
    return this.medicalPrescriptionService.create(id, createMedicalPrescriptionDto);
  }

  @MessagePattern({cmd: 'registerMedicalPrescriptionsByDiagnosticId'})
  registerMedicalPrescriptionsByDiagnosticId(data: {id: number, medicalPrescriptions: any}) {
    const {id, medicalPrescriptions} = data
    return this.medicalPrescriptionService.registerMedicalPrescriptionsByDiagnosticId(id, medicalPrescriptions.medicalPrescriptions);
  }

  @MessagePattern({cmd: 'findAllMedicalPrescriptions'})
  findAll() {
    return this.medicalPrescriptionService.findAll();
  }

  @MessagePattern({cmd: 'findOneMedicalPrescription'})
  findOne(id: number) {
    return this.medicalPrescriptionService.findOne(id);
  }

  @MessagePattern({cmd: 'findOneMedicalPrescriptionByIdAndDiagnosticId'})
  findOneByDiagnosticId(data: {id: number, medicalPrescriptionId: number}) {
    const {id, medicalPrescriptionId} = data
    return this.medicalPrescriptionService.findOneByIdAndDiagnosticId(id, medicalPrescriptionId);
  }

  @MessagePattern({cmd: 'findAllMedicalPrescriptionsByDiagnosticId'})
  findAllByDiagnosticId(id: number) {
    return this.medicalPrescriptionService.findAllByDiagnosticId(id);
  }

  @MessagePattern({cmd: 'updateMedicalPrescription'})
  update(data: {id: number, updateMedicalPrescriptionDto: UpdateMedicalPrescriptionDto}) {
    const {id, updateMedicalPrescriptionDto} = data
    return this.medicalPrescriptionService.update(id, updateMedicalPrescriptionDto);
  }
}
