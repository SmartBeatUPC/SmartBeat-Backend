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
  createMedicalRecord(data: {consultationId: number, createMedicalRecordDto: CreateMedicalRecordDto}) {
    const {consultationId, createMedicalRecordDto} = data
    return this.medicalConsultationService.createMedicalRecordByMedicalConsultationId(consultationId, createMedicalRecordDto);
  }

  @MessagePattern({cmd: 'findAllMedicalConsultation'})
  findAll() {
    return this.medicalConsultationService.findAll();
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
