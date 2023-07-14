import { Injectable } from '@nestjs/common';
import { CreateMedicalInformationDto } from '../dto/create-medical-information.dto';
import { UpdateMedicalInformationDto } from '../dto/update-medical-information.dto';
import { MedicalInformationService } from 'src/domain/index.domain';

@Injectable()
export class MedicalInformationServiceImpl implements MedicalInformationService{
  create(createMedicalInformationDto: CreateMedicalInformationDto) {
    return 'This action adds a new medicalInformation';
  }

  findAll() {
    return `This action returns all medicalInformation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medicalInformation`;
  }

  update(id: number, updateMedicalInformationDto: UpdateMedicalInformationDto) {
    return `This action updates a #${id} medicalInformation`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicalInformation`;
  }
}
