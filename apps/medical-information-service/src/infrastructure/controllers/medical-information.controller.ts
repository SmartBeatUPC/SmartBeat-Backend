import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MedicalInformationServiceImpl, CreateMedicalInformationDto, UpdateMedicalInformationDto } from 'src/application/index.application';


@Controller()
export class MedicalInformationController {
  constructor(private readonly medicalInformationService: MedicalInformationServiceImpl) {}

  @MessagePattern({cmd: 'createMedicalRecordAndMedicalInformation'})
  createMedicalRecordAndMedicalInformation(data:{ consultationId: number, requestMedicalRecordAndInformation: any}) {
    const {consultationId, requestMedicalRecordAndInformation} = data
    return this.medicalInformationService.createMedicalRecordAndMedicalInformation(consultationId, requestMedicalRecordAndInformation.requestMedicalRecordDto, requestMedicalRecordAndInformation.requestMedicalInformationDto);
  }

  @MessagePattern({cmd: 'createMedicalInformation'})
  create(data:{ id: number,createMedicalInformationDto: CreateMedicalInformationDto}) {
    const {id ,createMedicalInformationDto} = data
    return this.medicalInformationService.create(id, createMedicalInformationDto);
  }

  @MessagePattern({cmd: 'findAllMedicalInformations'})
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
  calculateBMI(data:{height: number, weight: number}) {
    const { height, weight} = data
    return this.medicalInformationService.calculateBMI(height, weight);
  }

}
