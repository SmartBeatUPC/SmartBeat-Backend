import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateMedicalPrescriptionDto, MedicalPrescriptionServiceImpl, UpdateMedicalPrescriptionDto } from 'src/application/index.application';



@Controller('medical-prescription')
export class MedicalPrescriptionController {
  constructor(private readonly medicalPrescriptionService: MedicalPrescriptionServiceImpl) {}

  @MessagePattern('createMedicalPrescription')
  create(@Payload() createMedicalPrescriptionDto: CreateMedicalPrescriptionDto) {
    return this.medicalPrescriptionService.create(createMedicalPrescriptionDto);
  }

  @MessagePattern('findAllMedicalPrescription')
  findAll() {
    return this.medicalPrescriptionService.findAll();
  }

  @MessagePattern('findOneMedicalPrescription')
  findOne(@Payload() id: number) {
    return this.medicalPrescriptionService.findOne(id);
  }

  @MessagePattern('updateMedicalPrescription')
  update(@Payload() updateMedicalPrescriptionDto: UpdateMedicalPrescriptionDto) {
    return this.medicalPrescriptionService.update(updateMedicalPrescriptionDto.id, updateMedicalPrescriptionDto);
  }

  @MessagePattern('removeMedicalPrescription')
  remove(@Payload() id: number) {
    return this.medicalPrescriptionService.remove(id);
  }
}
