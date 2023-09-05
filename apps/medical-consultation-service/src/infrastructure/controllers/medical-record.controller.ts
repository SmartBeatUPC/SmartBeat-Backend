import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MedicalRecordServiceImpl, CreateMedicalRecordDto, UpdateMedicalRecordDto } from 'src/application/index.application';


@Controller()
export class MedicalRecordController {
  constructor(private readonly medicalRecordService: MedicalRecordServiceImpl) {}

  @MessagePattern({cmd:'findAllMedicalRecord'})
  findAll() {
    return this.medicalRecordService.findAll();
  }

  @MessagePattern({cmd:'findOneMedicalRecord'})
  findOne(@Payload() id: number) {
    return this.medicalRecordService.findOne(id);
  }

  @MessagePattern({cmd:'findOneMedicalRecordByIdAndMedicalConsultationId'})
  findOneMedicalRecordByIdAndMedicalConsultationId(data: {consultationId: number, id: number}) {
    const {consultationId, id} = data
    return this.medicalRecordService.findByIdAndMedicalConsultationId(consultationId, id);
  }

  @MessagePattern({cmd:'findAllMedicalRecordsByMedicalConsultationId'})
  findAllMedicalRecordsByMedicalConsultationId(consultationId: number) {
    return this.medicalRecordService.findAllMedicalRecordsByMedicalConsultationId(consultationId);
  }
}
