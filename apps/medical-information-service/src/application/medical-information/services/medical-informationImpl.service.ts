import { Injectable } from '@nestjs/common';
import { CreateMedicalInformationDto } from '../dto/create-medical-information.dto';
import { MedicalInformationResponse, UpdateMedicalInformationDto } from '../dto/update-medical-information.dto';
import { MedicalInformation, MedicalInformationService, Pathology, Ppg } from 'src/domain/index.domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalRecordClient } from 'src/shared/medical-record/medical-record.client';

@Injectable()
export class MedicalInformationServiceImpl implements MedicalInformationService{

  constructor(@InjectRepository(MedicalInformation) private medicalInformationRepository: Repository<MedicalInformation>,
  @InjectRepository(Pathology) private pathologyRepository: Repository<Pathology>,
  @InjectRepository(Ppg) private ppgRepository: Repository<Ppg>,
  private medicalRecordClient: MedicalRecordClient){}
  
  calculateBMI(heightPatient: number, weightPatient: number) {
    try{
      const BMI =  weightPatient/ (heightPatient*heightPatient);
      return BMI.toFixed(1);
    }catch(error){
      return new MedicalInformationResponse('An error occurred while calculate BMI: '+error.message);
    }
  }

  async createMedicalRecordAndMedicalInformation(id: number, createMedicalRecordDto: any, createMedicalInformationDto: CreateMedicalInformationDto) {
    try{
      const responseMedicalRecord = await this.medicalRecordClient.createMedicalRecord(id,createMedicalRecordDto);

      if(!responseMedicalRecord || responseMedicalRecord.success == false) return new MedicalInformationResponse(responseMedicalRecord.message);
      let newMedicalRecord = responseMedicalRecord.resource;
      
      const newMedicalInformation = await this.medicalInformationRepository.save({
      medicalRecordId: newMedicalRecord.id,
      ...createMedicalInformationDto
      });
    return {newMedicalInformation, newMedicalRecord};
    }catch(error){
      return new MedicalInformationResponse('An error occurred while saving medical-information: '+error.message);
    }
  }

  async getCompleteMedicalInformationById(id: number){
    try{
      const medicalInformationExist = await this.medicalInformationRepository.findOneBy({id:id});
      if(!medicalInformationExist) return new MedicalInformationResponse(`Medical Information with id ${id} not found`);
      const PpgExist = await this.ppgRepository.findOneBy({medicalInformationId: id});
      if(!PpgExist) return new MedicalInformationResponse(`PPG with Medical Information id ${id} is not registered.`);
      let listPathologies = []
      const pathologies = await this.pathologyRepository.findBy({medicalInformationId: id});
      if (pathologies || pathologies.length > 0) {
        await pathologies.forEach((pathology) => {
            listPathologies.push(pathology.pathology);
        });
      }
      let completeMedicalInformation:any = '';
      completeMedicalInformation = {
        medicalRecordId: medicalInformationExist.medicalRecordId,
        height: medicalInformationExist.height,
        weight: medicalInformationExist.weight,
        smoke: medicalInformationExist.smoke,
        bmi: medicalInformationExist.bmi,
        alcohol: medicalInformationExist.alcohol,
        sedentary: medicalInformationExist.sedentary,
        bloodPressureSistolic: PpgExist.bloodPressureSistolic,
        bloodPressureDiastolic: PpgExist.bloodPressureDiastolic,
        heartRate: PpgExist.heartRate,
        success: true,
        pathologies: listPathologies
      }

      return completeMedicalInformation;

    }catch(error){
      return new MedicalInformationResponse('An error occurred while saving medical-information: '+error.message);
    }
  }

  async create(recordId: number ,createMedicalInformationDto: CreateMedicalInformationDto) {
    try{
      const medicalInformationExist = await this.medicalInformationRepository.findOneBy({medicalRecordId:recordId})
      if(medicalInformationExist) return new MedicalInformationResponse(`Medical Information with Medical Record id ${recordId} is registered. Please, use the update service`)
      const newMedicalInformation = await this.medicalInformationRepository.save({
      medicalRecordId: recordId,
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
        medicalRecordId: medicalInformationExist.medicalRecordId,
        ...updateMedicalInformationDto
      })
      return new MedicalInformationResponse('',updatedMedicalInformation);
    }catch(error){
      return new MedicalInformationResponse('An error occurred while updating medical-information: '+error.message);
    }
  }

 
}
