import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from '../dto/create-doctor.dto';
import { DoctorResponse, UpdateDoctorDto } from '../dto/update-doctor.dto';
import { Doctor, DoctorService, User } from 'src/domain/index.domain';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DoctorServiceImpl implements DoctorService{
  
  constructor(@InjectRepository(Doctor) private doctorRepository: Repository<Doctor>,
  @InjectRepository(User) private userRepository: Repository<User>){}

  async create(createDoctorDto: CreateDoctorDto) {
    try{
      const userExist = await this.userRepository.findOne({where: {id: createDoctorDto.userId, isDoctor: true}});
      if(!userExist) return new DoctorResponse(`User with id ${createDoctorDto.userId} was not found`);
      const newDoctor = await this.doctorRepository.save({
        ...createDoctorDto
      })
      return new DoctorResponse('',newDoctor);
    }catch(error){
      return new DoctorResponse('An error occurred while saving doctor: '+error.message)
    }
  }

  findAll() {
    return this.doctorRepository.find();
  }

  async findOne(id: number) {
    try{
      const doctorExist = await this.doctorRepository.findOneBy({id: id});
      if(!doctorExist) return new DoctorResponse(`Doctor with id ${id} was not found`);
      return new DoctorResponse('',doctorExist);
    }catch(error){
      return new DoctorResponse('An error occurred while finding doctor: '+error.message)
    }
  }

  async findByUserId(userId: number) {
    try{
      const doctorExist = await this.doctorRepository.findOneBy({userId: userId});
      if(!doctorExist) return new DoctorResponse(`Doctor with User id ${userId} was not found`);
      return new DoctorResponse('',doctorExist);
    }catch(error){
      return new DoctorResponse('An error occurred while finding doctor: '+error.message)
    }
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    try{
      const doctorExist = await this.doctorRepository.findOneBy({id: id});
      if(!doctorExist) return new DoctorResponse(`Doctor with id ${id} was not found`);
      const updatedDoctor = await this.doctorRepository.save({
        id: id,
        ...updateDoctorDto
      })
      return new DoctorResponse('',updatedDoctor)

    }catch(error){
      return new DoctorResponse('An error occurred while updating doctor: '+error.message)
    }
  }

  async remove(id: number) {
    try{
      const doctorExist = await this.doctorRepository.findOneBy({id: id});
      if(!doctorExist) return new DoctorResponse(`Doctor with id ${id} was not found`);
      const deletedDoctor = await this.doctorRepository.delete({
        id: id
      })
      return deletedDoctor;
    }catch(error){
      return new DoctorResponse('An error occurred while deleting doctor: '+error.message)
    }
  }
}
