import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MedicalInformationServiceImpl, CreateMedicalInformationDto, UpdateMedicalInformationDto } from 'src/application/index.application';


@Controller()
export class MedicalInformationController {
  constructor(private readonly medicalInformationService: MedicalInformationServiceImpl) {}

  @MessagePattern({cmd: 'createMedicalInformation'})
  create(data:{ recordId: number, createMedicalInformationDto: CreateMedicalInformationDto}) {
    const {recordId, createMedicalInformationDto} = data
    return this.medicalInformationService.create(recordId, createMedicalInformationDto);
  }

  @MessagePattern({cmd: 'findAllMedicalInformation'})
  findAll() {
    return this.medicalInformationService.findAll();
  }

  @MessagePattern({cmd: 'findOneMedicalInformation'})
  findOne(id: number) {
    return this.medicalInformationService.findOne(id);
  }

  @MessagePattern({cmd: 'updateMedicalInformation'})
  update(data:{id: number, updateMedicalInformationDto: UpdateMedicalInformationDto}) {
    const {id, updateMedicalInformationDto} = data
    return this.medicalInformationService.update(id, updateMedicalInformationDto);
  }

  @MessagePattern({cmd: 'calculateBMI'})
  calculateBMI(data:{weight: number, height: number}) {
    const {weight, height} = data
    return this.medicalInformationService.calculateBMI(height, weight);
  }

}
