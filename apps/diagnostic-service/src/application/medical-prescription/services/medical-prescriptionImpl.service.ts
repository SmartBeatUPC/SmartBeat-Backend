import { Injectable } from '@nestjs/common';
import { CreateMedicalPrescriptionDto } from '../dto/create-medical-prescription.dto';
import { UpdateMedicalPrescriptionDto } from '../dto/update-medical-prescription.dto';
import { MedicalPrescriptionService } from 'src/domain/index.domain';


@Injectable()
export class MedicalPrescriptionServiceImpl implements MedicalPrescriptionService {
  create(createMedicalPrescriptionDto: CreateMedicalPrescriptionDto) {
    return 'This action adds a new medicalPrescription';
  }

  findAll() {
    return `This action returns all medicalPrescription`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medicalPrescription`;
  }

  update(id: number, updateMedicalPrescriptionDto: UpdateMedicalPrescriptionDto) {
    return `This action updates a #${id} medicalPrescription`;
  }

  remove(id: number) {
    return `This action removes a #${id} medicalPrescription`;
  }
}
