import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateMedicalConsultationDto, MedicalConsultationServiceImpl, UpdateMedicalConsultationDto } from 'src/application/index.application';


@Controller()
export class MedicalConsultationController {
  constructor(private readonly medicalConsultationService: MedicalConsultationServiceImpl) {}

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
