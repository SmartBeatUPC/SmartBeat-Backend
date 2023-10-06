import { Injectable } from '@nestjs/common';
import { CreateMedicalConsultationDto } from '../dto/create-medical-consultation.dto';
import { MedicalConsultationResponse, UpdateMedicalConsultationDto } from '../dto/update-medical-consultation.dto';
import { MedicalConsultation, MedicalConsultationService, MedicalRecord } from 'src/domain/index.domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMedicalRecordDto } from 'src/application/index.application';
import { MedicalRecordResponse } from 'src/application/medical-record/dto/update-medical-record.dto';

@Injectable()
export class MedicalConsultationServiceImpl implements MedicalConsultationService{

  constructor(@InjectRepository(MedicalConsultation) private medicalConsultationRepository: Repository<MedicalConsultation>,
  @InjectRepository(MedicalRecord) private medicalRecordRepository: Repository<MedicalRecord>){}

  async create(createMedicalConsultationDto: CreateMedicalConsultationDto) {
    try{
      const newMedicalConsultation = await this.medicalConsultationRepository.save({
      ...createMedicalConsultationDto
      });
    return new MedicalConsultationResponse('',newMedicalConsultation);
    }catch(error){
      return new MedicalConsultationResponse('An error occurred while saving medical-consultation: '+error.message);
    }
  }

  async createMedicalRecordByMedicalConsultationId(consultationId: number, createMedicalRecord: CreateMedicalRecordDto){
    try {
        const consultationExist = await this.medicalConsultationRepository.findOneBy({ id: consultationId });
        if (!consultationExist) return new MedicalConsultationResponse(`Medical Consultation with id ${consultationId} was not found`);

        if(!createMedicalRecord.recordDate) {
          createMedicalRecord.recordDate = new Date()
        } 

        const recordPreload = await this.medicalRecordRepository.create(createMedicalRecord);
        recordPreload.medical_consultation = consultationExist;

        const newRecord = await this.medicalRecordRepository.save(recordPreload);

        return new MedicalRecordResponse('', newRecord);
    }
    catch (error) {
        return new MedicalRecordResponse('An error occurred while creating medical-record: ' + error);
    }
  }

  findAll() {
    return this.medicalConsultationRepository.find();
  }

  async findOne(id: number) {
    try{
      const medicalConsultationExist =  await this.medicalConsultationRepository.findOne({where: {id: id}});

      if (!medicalConsultationExist) return new MedicalConsultationResponse(`Medical Consultation with id ${id} is not registered`);
      return new MedicalConsultationResponse('',medicalConsultationExist);
    }catch(error){
      return new MedicalConsultationResponse(`An error ocurred when finding ` + error.message);
    }
  }

  async findAllByPatientId(patientId: number){
    try{
      const medicalConsultations=  await this.medicalConsultationRepository.find({where: {patientId: patientId}});

      if (!medicalConsultations || medicalConsultations.length == 0) return new MedicalConsultationResponse(`Medical Consultations with Patient Id ${patientId} are not registered`);
      return medicalConsultations;
    }catch(error){
      return new MedicalConsultationResponse(`An error ocurred when finding ` + error.message);
    }
  }

  async findAllByDoctorId(doctorId: number){
    try{
      const medicalConsultations=  await this.medicalConsultationRepository.find({where: {doctorId: doctorId}});

      if (!medicalConsultations || medicalConsultations.length == 0) return new MedicalConsultationResponse(`Medical Consultations with Doctor Id ${doctorId} are not registered`);
      return medicalConsultations;
    }catch(error){
      return new MedicalConsultationResponse(`An error ocurred when finding ` + error.message);
    }
  }

  async findOneByIdAndPatientId(patientId: number, id: number){
    try{
      const medicalConsultationExist=  await this.medicalConsultationRepository.findOneBy({id: id, patientId: patientId});

      if (!medicalConsultationExist) return new MedicalConsultationResponse(`Medical Consultation with Id ${id} and Patient Id ${patientId} is not registered`);
      return new MedicalConsultationResponse('',medicalConsultationExist);
    }catch(error){
      return new MedicalConsultationResponse(`An error ocurred when finding ` + error.message);
    }
  }

  async findOneByIdAndDoctorId(doctorId: number, id: number){
    try{
      const medicalConsultationExist=  await this.medicalConsultationRepository.findOneBy({id: id, doctorId: doctorId});

      if (!medicalConsultationExist) return new MedicalConsultationResponse(`Medical Consultation with Id ${id} and Doctor Id ${doctorId} is not registered`);
      return new MedicalConsultationResponse('',medicalConsultationExist);
    }catch(error){
      return new MedicalConsultationResponse(`An error ocurred when finding ` + error.message);
    }
  }

  async update(id: number, updateMedicalConsultationDto: UpdateMedicalConsultationDto) {
    try{
      const medicalConsultationExist =  await this.medicalConsultationRepository.findOne({where: {id: id}});

      if (!medicalConsultationExist) return new MedicalConsultationResponse(`Medical Consultation with id ${id} is not registered`);
      const updatedMedicalConsultation = await this.medicalConsultationRepository.save({
        ...updateMedicalConsultationDto
      });
    return new MedicalConsultationResponse('',updatedMedicalConsultation);
    }catch(error){
      return new MedicalConsultationResponse('An error occurred while updating medical-consultation: '+error.message);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} medicalConsultation`;
  }
}
