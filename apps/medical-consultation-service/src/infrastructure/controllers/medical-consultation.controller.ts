import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateMedicalConsultationDto, CreateMedicalRecordDto, MedicalConsultationServiceImpl, UpdateMedicalConsultationDto } from 'src/application/index.application';


@Controller()
export class MedicalConsultationController {
  constructor(private readonly medicalConsultationService: MedicalConsultationServiceImpl) {}

  @MessagePattern({cmd: 'createMedicalConsultation'})
  create(createMedicalConsultationDto: CreateMedicalConsultationDto) {
    return this.medicalConsultationService.create(createMedicalConsultationDto);
  }

  @MessagePattern({cmd: 'createMedicalRecord'})
  createMedicalRecord(data: {id: number, createMedicalRecordDto: CreateMedicalRecordDto}) {
    const {id, createMedicalRecordDto} = data
    return this.medicalConsultationService.createMedicalRecordByMedicalConsultationId(id, createMedicalRecordDto);
  }

  @MessagePattern({cmd: 'findAllMedicalConsultations'})
  findAll() {
    return this.medicalConsultationService.findAll();
  }

  @MessagePattern({cmd: 'findAllMedicalConsultationsByPatientId'})
  findAllMedicalConsultationsByPatientId(id: number) {
    return this.medicalConsultationService.findAllByPatientId(id);
  }

  @MessagePattern({cmd: 'findAllMedicalConsultationsByDoctorId'})
  findAllMedicalConsultationsByDoctorId(id: number) {
    return this.medicalConsultationService.findAllByDoctorId(id);
  }

  @MessagePattern({cmd: 'findOneMedicalConsultationByIdAndPatientId'})
  findOneMedicalConsultationByIdAndPatientId(data: {id, medicalConsultationId}) {
    const {id, medicalConsultationId} = data
    return this.medicalConsultationService.findOneByIdAndPatientId(id, medicalConsultationId);
  }

  @MessagePattern({cmd: 'findOneMedicalConsultationByIdAndDoctorId'})
  findOneMedicalConsultationByIdAndDoctorId(data: {id, medicalConsultationId}) {
    const {id, medicalConsultationId} = data
    return this.medicalConsultationService.findOneByIdAndDoctorId(id, medicalConsultationId);
  }

  @MessagePattern({cmd: 'findOneMedicalConsultation'})
  findOne(@Payload() id: number) {
    return this.medicalConsultationService.findOne(id);
  }

  @MessagePattern({cmd: 'updateMedicalConsultation'})
  update(data: {id, updateMedicalConsultationDto: UpdateMedicalConsultationDto}) {
    const {id, updateMedicalConsultationDto} = data
    return this.medicalConsultationService.update(id, updateMedicalConsultationDto);
  }

  @MessagePattern({cmd: 'removeMedicalConsultation'})
  remove(@Payload() id: number) {
    return this.medicalConsultationService.remove(id);
  }
}
