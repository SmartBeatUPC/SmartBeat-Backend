import { Injectable } from '@nestjs/common';
import { CreateMedicalPrescriptionDto } from '../dto/create-medical-prescription.dto';
import { MedicalPrescriptionResponse, UpdateMedicalPrescriptionDto } from '../dto/update-medical-prescription.dto';
import { Diagnostic, MedicalPrescription, MedicalPrescriptionService } from 'src/domain/index.domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class MedicalPrescriptionServiceImpl implements MedicalPrescriptionService {
  
  constructor(@InjectRepository(MedicalPrescription) private medicalPrescriptionRepository: Repository<MedicalPrescription>,
  @InjectRepository(Diagnostic) private diagnosticRepository: Repository<Diagnostic>){}

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
  async registerMedicalPrescriptionsByDiagnosticId(id: number, medicalPrescriptions: any){
    try{

      const diagnosticExist = await this.diagnosticRepository.findOneBy({id:id})
      if(!diagnosticExist) return new MedicalPrescriptionResponse(`Diagnostic with id ${id} not found`)

      if(!medicalPrescriptions || medicalPrescriptions.length == 0) return new MedicalPrescriptionResponse(`No medicines to be recorded`)

      let listMedicalPrescriptions = []
      for(let i=0; i< medicalPrescriptions.length; i++){
        const newMedicalPrescription= await this.medicalPrescriptionRepository.save({
          diagnosticId: diagnosticExist.id,
          medicament: medicalPrescriptions[i].medicament,
          dosage: medicalPrescriptions[i].dosage,
          via: medicalPrescriptions[i].via,
          frequency: medicalPrescriptions[i].frequency,
          duration: medicalPrescriptions[i].duration
          });

        listMedicalPrescriptions.push(newMedicalPrescription);
      }
      
      return {listMedicalPrescriptions, success: true};
    }catch(error){
      return new MedicalPrescriptionResponse('An error occurred while creating Medical Prescriptions: '+error.message);
    }
  }
  findAll() {
    return this.medicalPrescriptionRepository.find();
  }

  async findOne(id: number) {
    try{
      const MedicalPrescriptionExist = await this.medicalPrescriptionRepository.findOneBy({id:id});
      if(!MedicalPrescriptionExist) return new MedicalPrescriptionResponse(`Medical Prescription with id ${id} was not found`);
      return new MedicalPrescriptionResponse('',MedicalPrescriptionExist);
    }catch(error){
      return new MedicalPrescriptionResponse('An error occurred while finding Medical Prescription: '+error.message);
    }
  }

  async findOneByIdAndDiagnosticId(id: number, medicalPrescriptionId: number) {
    try{
      const MedicalPrescriptionExist = await this.medicalPrescriptionRepository.findOneBy({diagnosticId: id, id: medicalPrescriptionId});
      if(!MedicalPrescriptionExist) return new MedicalPrescriptionResponse(`Medical Prescription with id ${medicalPrescriptionId} and  Diagnostic id ${id} was not found`);
      return new MedicalPrescriptionResponse('',MedicalPrescriptionExist);
    }catch(error){
      return new MedicalPrescriptionResponse('An error occurred while finding Medical Prescription: '+error.message);
    }
  }

  async findAllByDiagnosticId(id: number) {
    try{
      const MedicalPrescriptions = await this.medicalPrescriptionRepository.findBy({diagnosticId: id});
      if(!MedicalPrescriptions || MedicalPrescriptions.length == 0) return new MedicalPrescriptionResponse(`Medical Prescriptions with Diagnostic id ${id} was not found`);
      return {MedicalPrescriptions, success:true};
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
