import { Injectable } from '@nestjs/common';
import { Diagnostic, DiagnosticService } from 'src/domain/index.domain';
import { CreateDiagnosticDto } from '../dto/create-diagnostic.dto';
import { DiagnosticResponse, UpdateDiagnosticDto } from '../dto/update-diagnostic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DiagnosticServiceImpl implements DiagnosticService {

  constructor(@InjectRepository(Diagnostic) private diagnosticRepository: Repository<Diagnostic>){}

  async create(consultationId: number, createDiagnosticDto: CreateDiagnosticDto) {
    try{
      const newDiagnostic = await this.diagnosticRepository.save({
      medicalConsultationId: consultationId,
      ...createDiagnosticDto
      });
    return new DiagnosticResponse('',newDiagnostic);
    }catch(error){
      return new DiagnosticResponse('An error occurred while saving diagnostic: '+error.message);
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

  async findByMedicalConsultationId(consultationId: number) {
    try{
      const diagnosticExist = await this.diagnosticRepository.findOneBy({medicalConsultationId:consultationId});
      if(!diagnosticExist) return new DiagnosticResponse(`Diagnostic with Consultation id ${consultationId} was not found`);
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
