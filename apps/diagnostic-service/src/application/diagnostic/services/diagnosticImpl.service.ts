import { Injectable } from '@nestjs/common';
import { Diagnostic, DiagnosticService, MedicalPrescription } from 'src/domain/index.domain';
import { CreateDiagnosticDto } from '../dto/create-diagnostic.dto';
import { DiagnosticResponse, UpdateDiagnosticDto } from '../dto/update-diagnostic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DiagnosticServiceImpl implements DiagnosticService {

  constructor(@InjectRepository(Diagnostic) private diagnosticRepository: Repository<Diagnostic>,
  @InjectRepository(MedicalPrescription) private medicalPrescriptionRepository: Repository<MedicalPrescription>){}

  async create(id: number, createDiagnosticDto: CreateDiagnosticDto) {
    try{
      const newDiagnostic = await this.diagnosticRepository.save({
      medicalRecordId: id,
      ...createDiagnosticDto
      });
      return new DiagnosticResponse('',newDiagnostic);
    }catch(error){
      return new DiagnosticResponse('An error occurred while saving diagnostic: '+error.message);
    }
  }

  async createCompleteDiagnostic(id: number, createDiagnosticDto: CreateDiagnosticDto, medicalPrescriptions?: any) {
    try{
      const newDiagnostic = await this.diagnosticRepository.save({
      medicalRecordId: id,
      ...createDiagnosticDto
      });
      if(!newDiagnostic) return new DiagnosticResponse('Diagnostic has not been saved correctly');
      let listMedicalPrescriptions = []
      if(medicalPrescriptions || medicalPrescriptions.length > 0)
      {
      for(let i=0; i< medicalPrescriptions.length; i++){
        const newMedicalPrescription = await this.medicalPrescriptionRepository.save({
          diagnosticId: newDiagnostic.id,
          medicament: medicalPrescriptions[i].medicament,
          dosage: medicalPrescriptions[i].dosage,
          via: medicalPrescriptions[i].via,
          frequency: medicalPrescriptions[i].frequency,
          duration: medicalPrescriptions[i].duration
          });

        listMedicalPrescriptions.push(newMedicalPrescription);
      }}
      return {newDiagnostic, listMedicalPrescriptions, success: true};
    }catch(error){
      return new DiagnosticResponse('An error occurred while saving diagnostic: '+error.message);
    }
  }

  async findCompleteDiagnosticById(id: number){
    try{
      const diagnostic = await this.diagnosticRepository.findOneBy({id: id});
      if(!diagnostic) return new DiagnosticResponse(`Diagnostic with id ${id} was not found`);
      let medicalPrescriptions:any = []
      medicalPrescriptions = await this.medicalPrescriptionRepository.findBy({diagnosticId: id});
      if(!medicalPrescriptions || medicalPrescriptions.length == 0) medicalPrescriptions = 'No se ha recetado ninguna medicina';
      return {diagnostic, medicalPrescriptions, success: true};
    }catch(error){
      return new DiagnosticResponse('An error occurred while finding diagnostic: '+error.message);
    }
  }

  async findCompleteDiagnosticByMedicalRecordId(id: number){
    try{
      const diagnostic = await this.diagnosticRepository.findOneBy({medicalRecordId: id});
      if(!diagnostic) return new DiagnosticResponse(`Diagnostic with Medical Record id ${id} was not found`);
      let medicalPrescriptions:any = []
      medicalPrescriptions = await this.medicalPrescriptionRepository.findBy({diagnosticId: diagnostic.id});
      if(!medicalPrescriptions || medicalPrescriptions.length == 0) medicalPrescriptions = 'No se ha recetado ninguna medicina';
      return {diagnostic, medicalPrescriptions, success: true};
    }catch(error){
      return new DiagnosticResponse('An error occurred while finding diagnostic: '+error.message);
    }
  }

  findAll() {
    return this.diagnosticRepository.find();
  }

  async findOne(id: number) {
    try{
      const diagnosticExist = await this.diagnosticRepository.findOneBy({id:id});
      if(!diagnosticExist) return new DiagnosticResponse(`Diagnostic with id ${id} was not found`);
      return new DiagnosticResponse('',diagnosticExist);
    }catch(error){
      return new DiagnosticResponse('An error occurred while finding diagnostic: '+error.message);
    }
  }

  async findByMedicalRecordId(id: number) {
    try{
      const diagnosticExist = await this.diagnosticRepository.findOneBy({medicalRecordId:id});
      if(!diagnosticExist) return new DiagnosticResponse(`Diagnostic with Medical Record id ${id} was not found`);
      return new DiagnosticResponse('',diagnosticExist);
    }catch(error){
      return new DiagnosticResponse('An error occurred while finding diagnostic: '+error.message);
    }
  }

  async update(id: number, updateDiagnosticDto: UpdateDiagnosticDto) {
    try{
      const diagnosticExist = await this.diagnosticRepository.findOneBy({id:id});
      if(!diagnosticExist) return new DiagnosticResponse(`Diagnostic with id ${id} was not found`);

      const updatedDiagnostic = await this.diagnosticRepository.save({
        id: diagnosticExist.id,
        ...updateDiagnosticDto
      })
      return new DiagnosticResponse('',updatedDiagnostic);
    }catch(error){
      return new DiagnosticResponse('An error occurred while updating diagnostic: '+error.message);
    }
  }

 
}
