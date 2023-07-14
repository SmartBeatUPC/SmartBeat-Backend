import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MedicalInformationServiceImpl, CreateMedicalInformationDto, UpdateMedicalInformationDto } from 'src/application/index.application';


@Controller()
export class MedicalInformationController {
  constructor(private readonly medicalInformationService: MedicalInformationServiceImpl) {}

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
