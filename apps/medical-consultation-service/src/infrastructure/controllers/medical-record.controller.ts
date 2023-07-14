import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MedicalRecordServiceImpl, CreateMedicalRecordDto, UpdateMedicalRecordDto } from 'src/application/index.application';


@Controller()
export class MedicalRecordController {
  constructor(private readonly medicalRecordService: MedicalRecordServiceImpl) {}

  @MessagePattern('createMedicalRecord')
  create(@Payload() createMedicalRecordDto: CreateMedicalRecordDto) {
    return this.medicalRecordService.create(createMedicalRecordDto);
  }

  @MessagePattern('findAllMedicalRecord')
  findAll() {
    return this.medicalRecordService.findAll();
  }

  @MessagePattern('findOneMedicalRecord')
  findOne(@Payload() id: number) {
    return this.medicalRecordService.findOne(id);
  }

  @MessagePattern('updateMedicalRecord')
  update(@Payload() updateMedicalRecordDto: UpdateMedicalRecordDto) {
    return this.medicalRecordService.update(updateMedicalRecordDto.id, updateMedicalRecordDto);
  }

  @MessagePattern('removeMedicalRecord')
  remove(@Payload() id: number) {
    return this.medicalRecordService.remove(id);
  }
}
