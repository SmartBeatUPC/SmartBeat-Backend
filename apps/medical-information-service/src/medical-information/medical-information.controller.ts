import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MedicalInformationService } from './medical-information.service';
import { CreateMedicalInformationDto } from './dto/create-medical-information.dto';
import { UpdateMedicalInformationDto } from './dto/update-medical-information.dto';

@Controller()
export class MedicalInformationController {
  constructor(private readonly medicalInformationService: MedicalInformationService) {}

  @MessagePattern('createMedicalInformation')
  create(@Payload() createMedicalInformationDto: CreateMedicalInformationDto) {
    return this.medicalInformationService.create(createMedicalInformationDto);
  }

  @MessagePattern('findAllMedicalInformation')
  findAll() {
    return this.medicalInformationService.findAll();
  }

  @MessagePattern('findOneMedicalInformation')
  findOne(@Payload() id: number) {
    return this.medicalInformationService.findOne(id);
  }

  @MessagePattern('updateMedicalInformation')
  update(@Payload() updateMedicalInformationDto: UpdateMedicalInformationDto) {
    return this.medicalInformationService.update(updateMedicalInformationDto.id, updateMedicalInformationDto);
  }

  @MessagePattern('removeMedicalInformation')
  remove(@Payload() id: number) {
    return this.medicalInformationService.remove(id);
  }
}
