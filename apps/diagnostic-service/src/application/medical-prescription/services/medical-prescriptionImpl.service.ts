import { Injectable } from '@nestjs/common';
import { CreateMedicalPrescriptionDto } from '../dto/create-medical-prescription.dto';
import { MedicalPrescriptionResponse, UpdateMedicalPrescriptionDto } from '../dto/update-medical-prescription.dto';
import { MedicalPrescription, MedicalPrescriptionService } from 'src/domain/index.domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class MedicalPrescriptionServiceImpl implements MedicalPrescriptionService {
  
  constructor(@InjectRepository(MedicalPrescription) private medicalPrescriptionRepository: Repository<MedicalPrescription>){}

  async create(diagnosticId: number, createMedicalPrescriptionDto: CreateMedicalPrescriptionDto) {
    try{
      const newMedicalPrescription = await this.medicalPrescriptionRepository.save({
      diagnosticId: diagnosticId,
      ...createMedicalPrescriptionDto
      });
    return new MedicalPrescriptionResponse('',newMedicalPrescription);
    }catch(error){
      return new MedicalPrescriptionResponse('An error occurred while saving Medical Prescription: '+error.message);
    }
  }

  findAll() {
    return this.medicalPrescriptionRepository.find();
  }

  async findOne(id: number) {
    try{
      const MedicalPrescriptionExist = await this.medicalPrescriptionRepository.findOneBy({id:id});
      if(!MedicalPrescriptionExist) return new MedicalPrescriptionResponse(`MedicalPrescription with id ${id} was not found`);
      return new MedicalPrescriptionResponse('',MedicalPrescriptionExist);
    }catch(error){
      return new MedicalPrescriptionResponse('An error occurred while finding MedicalPrescription: '+error.message);
    }
  }

  async findByDiagnosticId(diagnosticId: number) {
    try{
      const MedicalPrescriptionExist = await this.medicalPrescriptionRepository.findOneBy({diagnosticId: diagnosticId});
      if(!MedicalPrescriptionExist) return new MedicalPrescriptionResponse(`Medical Prescription with Diagnostic id ${diagnosticId} was not found`);
      return new MedicalPrescriptionResponse('',MedicalPrescriptionExist);
    }catch(error){
      return new MedicalPrescriptionResponse('An error occurred while finding Medical Prescription: '+error.message);
    }
  }

  async update(id: number, updateMedicalPrescriptionDto: UpdateMedicalPrescriptionDto) {
    try{
      const MedicalPrescriptionExist = await this.medicalPrescriptionRepository.findOneBy({id:id});
      if(!MedicalPrescriptionExist) return new MedicalPrescriptionResponse(`Medical Prescription with id ${id} was not found`);

      const updatedMedicalPrescription = await this.medicalPrescriptionRepository.save({
        id: MedicalPrescriptionExist.id,
        ...updateMedicalPrescriptionDto
      })
      return new MedicalPrescriptionResponse('',updatedMedicalPrescription);
    }catch(error){
      return new MedicalPrescriptionResponse('An error occurred while updating Medical Prescription: '+error.message);
    }
  }
}
