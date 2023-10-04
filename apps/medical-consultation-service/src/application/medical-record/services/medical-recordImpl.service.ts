import { Injectable } from '@nestjs/common';
import { MedicalConsultation, MedicalRecord, MedicalRecordService } from 'src/domain/index.domain';
import { CreateMedicalRecordDto } from '../dto/create-medical-record.dto';
import { MedicalRecordResponse, UpdateMedicalRecordDto } from '../dto/update-medical-record.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalConsultationResponse } from 'src/application/medical-consultation/dto/update-medical-consultation.dto';
import { Repository } from 'typeorm';
import { plainToInstance } from "class-transformer";


@Injectable()
export class MedicalRecordServiceImpl implements MedicalRecordService{

  constructor(@InjectRepository(MedicalConsultation) private medicalConsultationRepository: Repository<MedicalConsultation>,
  @InjectRepository(MedicalRecord) private medicalRecordRepository: Repository<MedicalRecord>){}
  
  findAll() {
    return this.medicalRecordRepository.find();
  }

  
  async findOne(id: number) {
    try{
      const medicalRecordExist =  await this.medicalRecordRepository.findOne({where: {id: id}});

      if (!medicalRecordExist) {
      return new MedicalRecordResponse(`Medical Record with id ${id} is not registered`);
      }
      return new MedicalRecordResponse('',medicalRecordExist);
    }catch(error){
      return new MedicalRecordResponse(`An error ocurred when finding ` + error.message);
    }
  }

  async findByIdAndMedicalConsultationId(consultationId: number, id: number){
    try{
      
      const medical_consultation = await this.medicalConsultationRepository.findOneBy({ id: consultationId });
    if (!medical_consultation) return new MedicalRecordResponse(`A Medical Consultation with id ${consultationId} was not found`);

    const medicalRecordExist = await this.medicalRecordRepository.findOne({
        where: {
            id:id,
            medical_consultation: {
                id: consultationId
            }
        },
        relations: ['medical_consultation']
    });
    
    if(!medicalRecordExist) return new MedicalRecordResponse(`Medical Record with id ${id} and Medical Consultation Id ${consultationId} was not found`)

    return new MedicalRecordResponse('',medicalRecordExist);
    }catch(error){
      return new MedicalRecordResponse(`An error ocurred when finding medical-record: ` + error.message);
    }
  }

  async findAllMedicalRecordsByMedicalConsultationId(consultationId: number) {
    try{
      const medical_consultation = await this.medicalConsultationRepository.findOneBy({ id: consultationId });
      if (!medical_consultation) return new MedicalRecordResponse(`A Medical Consultation with id ${consultationId} was not found`);

      const MedicalRecords = await this.medicalRecordRepository.find({
          where: {
              medical_consultation: {
                  id: consultationId
              }
          },
          relations: ['medical_consultation']
      });
      if(!MedicalRecords || MedicalRecords.length == 0) return new MedicalRecordResponse(`No Medical Records found with the inserted Medical Consultation Id ${consultationId}`);
      return MedicalRecords;
    }catch(error){
    return new MedicalRecordResponse(`An error ocurred when finding medical-record: ` + error.message);
    }
  }

}
