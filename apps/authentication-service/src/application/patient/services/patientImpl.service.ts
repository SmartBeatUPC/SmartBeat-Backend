import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { PatientResponse, UpdatePatientDto } from '../dto/update-patient.dto';
import { Patient, PatientService, User } from 'src/domain/index.domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PatientServiceImpl implements PatientService {

  constructor(@InjectRepository(Patient) private patientRepository: Repository<Patient>,
  @InjectRepository(User) private userRepository: Repository<User>){}

  async create(createPatientDto: CreatePatientDto) {
    try{
      // const userExist = await this.userRepository.findOne({where: {id: createPatientDto.userId, isDoctor: false}});
      // if(!userExist) return new PatientResponse(`User with id ${createPatientDto.userId} was not found`);
      const newPatient = await this.patientRepository.save({
        ...createPatientDto
      })
      return new PatientResponse('',newPatient);
    }catch(error){
      return new PatientResponse('An error occurred while saving patient: '+error.message)
    }
  }

  findAll() {
    return this.patientRepository.find();
  }

  async findOne(id: number) {
    try{
      const PatientExist = await this.patientRepository.findOneBy({id: id});
      if(!PatientExist) return new PatientResponse(`Patient with id ${id} was not found`);
      return new PatientResponse('',PatientExist);
    }catch(error){
      return new PatientResponse('An error occurred while finding patient: '+error.message)
    }
  }

  async findByUserId(userId: number) {
    try{
      const PatientExist = await this.patientRepository.findOneBy({userId: userId});
      if(!PatientExist) return new PatientResponse(`Patient with User id ${userId} was not found`);
      return new PatientResponse('',PatientExist);
    }catch(error){
      return new PatientResponse('An error occurred while finding patient: '+error.message)
    }
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    try{
      const PatientExist = await this.patientRepository.findOneBy({id: id});
      if(!PatientExist) return new PatientResponse(`Patient with id ${id} was not found`);
      const updatedPatient = await this.patientRepository.save({
        id: id,
        ...updatePatientDto
      })
      return new PatientResponse('',updatedPatient)

    }catch(error){
      return new PatientResponse('An error occurred while updating patient: '+error.message)
    }
  }

  async remove(id: number) {
    try{
      const PatientExist = await this.patientRepository.findOneBy({id: id});
      if(!PatientExist) return new PatientResponse(`Patient with id ${id} was not found`);
      const deletedPatient = await this.patientRepository.delete({
        id: id
      })
      return deletedPatient;
    }catch(error){
      return new PatientResponse('An error occurred while deleting patient: '+error.message)
    }
  }
}
