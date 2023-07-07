import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MedicalConsultationService } from './medical-consultation.service';
import { CreateMedicalConsultationDto } from './dto/create-medical-consultation.dto';
import { UpdateMedicalConsultationDto } from './dto/update-medical-consultation.dto';

@Controller()
export class MedicalConsultationController {
  constructor(private readonly medicalConsultationService: MedicalConsultationService) {}

  @MessagePattern('createMedicalConsultation')
  create(@Payload() createMedicalConsultationDto: CreateMedicalConsultationDto) {
    return this.medicalConsultationService.create(createMedicalConsultationDto);
  }

  @MessagePattern('findAllMedicalConsultation')
  findAll() {
    return this.medicalConsultationService.findAll();
  }

  @MessagePattern('findOneMedicalConsultation')
  findOne(@Payload() id: number) {
    return this.medicalConsultationService.findOne(id);
  }

  @MessagePattern('updateMedicalConsultation')
  update(@Payload() updateMedicalConsultationDto: UpdateMedicalConsultationDto) {
    return this.medicalConsultationService.update(updateMedicalConsultationDto.id, updateMedicalConsultationDto);
  }

  @MessagePattern('removeMedicalConsultation')
  remove(@Payload() id: number) {
    return this.medicalConsultationService.remove(id);
  }
}
