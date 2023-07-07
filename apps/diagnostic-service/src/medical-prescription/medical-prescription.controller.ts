import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MedicalPrescriptionService } from './medical-prescription.service';
import { CreateMedicalPrescriptionDto } from './dto/create-medical-prescription.dto';
import { UpdateMedicalPrescriptionDto } from './dto/update-medical-prescription.dto';

@Controller('medical-prescription')
export class MedicalPrescriptionController {
  constructor(private readonly medicalPrescriptionService: MedicalPrescriptionService) {}

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
