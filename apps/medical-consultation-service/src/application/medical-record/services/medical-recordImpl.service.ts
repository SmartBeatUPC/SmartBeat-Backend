import { Injectable } from '@nestjs/common';
import { MedicalConsultation, MedicalRecord, MedicalRecordService } from 'src/domain/index.domain';
import { CreateMedicalRecordDto } from '../dto/create-medical-record.dto';
import { MedicalRecordResponse, UpdateMedicalRecordDto } from '../dto/update-medical-record.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalConsultationResponse } from 'src/application/medical-consultation/dto/update-medical-consultation.dto';
import { Between, Repository } from 'typeorm';
import { plainToInstance } from "class-transformer";
import { endOfDay, format, startOfDay } from 'date-fns';
import { DiagnosticClient } from 'src/shared/diagnostic/diagnostic.client';
import { utcToZonedTime } from 'date-fns-tz';


@Injectable()
export class MedicalRecordServiceImpl implements MedicalRecordService{

  constructor(@InjectRepository(MedicalConsultation) private medicalConsultationRepository: Repository<MedicalConsultation>,
  @InjectRepository(MedicalRecord) private medicalRecordRepository: Repository<MedicalRecord>,
  private diagnosticClient: DiagnosticClient ){}
  
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

  async findAllMedicalRecordsByMedicalConsultationId(consultationId: number, filter?: number) {
    try{
      const medical_consultation = await this.medicalConsultationRepository.findOneBy({ id: consultationId });
      if (!medical_consultation) return new MedicalRecordResponse(`A Medical Consultation with id ${consultationId} was not found`);
      let MedicalRecords: any = [];

      if(filter == 2){
        let peruZone = 'America/Lima'
        let today = utcToZonedTime(new Date(), peruZone);
        MedicalRecords = await this.medicalRecordRepository.find({
            where: {
                medical_consultation: {
                    id: consultationId
                },
                recordDate: Between(startOfDay(today), endOfDay(today))
            },
            relations: ['medical_consultation'],
            order: {
              id: 'DESC'
            }
        });
      }else{
          MedicalRecords = await this.medicalRecordRepository.find({
            where: {
                medical_consultation: {
                    id: consultationId
                }
            },
            relations: ['medical_consultation'],
            order: {
              id: 'DESC'
            }
        });
      }

      if(!MedicalRecords || MedicalRecords.length == 0) return new MedicalRecordResponse(`No Medical Records found with the inserted Medical Consultation Id ${consultationId}`);
      if(filter == 3){
        let diagnosticRecords = [];
        for (let i=0; i<MedicalRecords.length; i++){
          try{
           
            let diagnosticExist = await this.diagnosticClient.findDiagnosticByMedicalRecordId(MedicalRecords[i].id)
            if(diagnosticExist && diagnosticExist.success) diagnosticRecords.push(MedicalRecords[i]);
            }catch{
              return new MedicalRecordResponse(`Diagnostic microservice is turned off.`);
            }
        }
        MedicalRecords = diagnosticRecords;
      }
      
      const formattedMedicalRecords = MedicalRecords.map((record) => ({
        ...record,
        recordDate: format(new Date(record.recordDate), 'yyyy/MM/dd'),
      }));
      if(!formattedMedicalRecords || formattedMedicalRecords.length == 0) return new MedicalRecordResponse(`No Medical Records found with the inserted Medical Consultation Id ${consultationId}`);
      
      //console.log(formattedMedicalRecords)
      return {medicalRecords: formattedMedicalRecords,success: true};
    }catch(error){
    return new MedicalRecordResponse(`An error ocurred when finding medical-record: ` + error.message);
    }
  }

  async findLastByMedicalConsultationId(consultationId: number){
    try{
      
      const medical_consultation = await this.medicalConsultationRepository.findOneBy({ id: consultationId });
    if (!medical_consultation) return new MedicalRecordResponse(`A Medical Consultation with Medical Consultation id ${consultationId} was not found`);

    const medicalRecordExist = await this.medicalRecordRepository.findOne({
        where: {
            medical_consultation: {
                id: consultationId
            }
        },
        relations: ['medical_consultation'],
        order: {
          id: 'DESC'
        }
    });
    
    if(!medicalRecordExist) return new MedicalRecordResponse(`Medical Record with Medical Consultation Id ${consultationId} was not found`)

    return new MedicalRecordResponse('',medicalRecordExist);
    }catch(error){
      return new MedicalRecordResponse(`An error ocurred when finding medical-record: ` + error.message);
    }
  }

}
