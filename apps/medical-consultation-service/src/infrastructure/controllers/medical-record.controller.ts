import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MedicalRecordServiceImpl, CreateMedicalRecordDto, UpdateMedicalRecordDto } from 'src/application/index.application';


@Controller()
export class MedicalRecordController {
  constructor(private readonly medicalRecordService: MedicalRecordServiceImpl) {}

  @MessagePattern({cmd:'findAllMedicalRecords'})
  findAll() {
    return this.medicalRecordService.findAll();
  }

  @MessagePattern({cmd:'findOneMedicalRecord'})
  findOne(@Payload() id: number) {
    return this.medicalRecordService.findOne(id);
  }

  @MessagePattern({cmd:'findOneMedicalRecordByIdAndMedicalConsultationId'})
  findOneMedicalRecordByIdAndMedicalConsultationId(data: {id: number, recordId: number}) {
    const {id, recordId} = data
    return this.medicalRecordService.findByIdAndMedicalConsultationId(id, recordId);
  }

  @MessagePattern({cmd:'findAllMedicalRecordsByMedicalConsultationId'})
  findAllMedicalRecordsByMedicalConsultationId(id: number) {
    return this.medicalRecordService.findAllMedicalRecordsByMedicalConsultationId(id);
  }
}
