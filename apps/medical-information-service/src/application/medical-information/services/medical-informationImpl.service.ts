import { Injectable } from '@nestjs/common';
import { CreateMedicalInformationDto } from '../dto/create-medical-information.dto';
import { MedicalInformationResponse, UpdateMedicalInformationDto } from '../dto/update-medical-information.dto';
import { MedicalInformation, MedicalInformationService } from 'src/domain/index.domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MedicalInformationServiceImpl implements MedicalInformationService{

  constructor(@InjectRepository(MedicalInformation) private medicalInformationRepository: Repository<MedicalInformation>){}
  
  calculateBMI(heightPatient: number, weightPatient: number) {
    try{
      const BMI =  weightPatient/ (heightPatient*heightPatient);
      return BMI;
    }catch(error){
      return new MedicalInformationResponse('An error occurred while calculate BMI: '+error.message);
    }
  }

  async create(recordId: number,createMedicalInformationDto: CreateMedicalInformationDto) {
    try{
      const newMedicalInformation = await this.medicalInformationRepository.save({
      // bmi: createMedicalInformationDto.bmi,
      // sedentary: createMedicalInformationDto.sedentary,
      // smoke: createMedicalInformationDto.smoke,
      // alcohol: createMedicalInformationDto.alcohol,
      medical_record_id: recordId,
      ...createMedicalInformationDto
      });
    return new MedicalInformationResponse('',newMedicalInformation);
    }catch(error){
      return new MedicalInformationResponse('An error occurred while saving medical-information: '+error.message);
    }
  }
  findAll() {
    return this.medicalInformationRepository.find();
  }

  async findOne(id: number) {
    try{
      const medicalInformationExist = await this.medicalInformationRepository.findOneBy({id:id})
      if(!medicalInformationExist) return new MedicalInformationResponse(`Medical Information with id ${id} not found`)

      return new MedicalInformationResponse('',medicalInformationExist);
    }catch(error){
      return new MedicalInformationResponse('An error occurred while finding medical-information: '+error.message);
    }
  }

  async update(id: number, updateMedicalInformationDto: UpdateMedicalInformationDto) {
    try{
      const medicalInformationExist = await this.medicalInformationRepository.findOneBy({id:id})
      if(!medicalInformationExist) return new MedicalInformationResponse(`Medical Information with id ${id} not found`)

      const updatedMedicalInformation = await this.medicalInformationRepository.save({
        id: medicalInformationExist.id,
        medical_record_id: medicalInformationExist.medical_record_id,
        ...updateMedicalInformationDto
      })
      return new MedicalInformationResponse('',medicalInformationExist);
    }catch(error){
      return new MedicalInformationResponse('An error occurred while finding medical-information: '+error.message);
    }
  }

 
}
