import { Injectable } from '@nestjs/common';
import { CreateDoctorCenterDto } from '../dto/create-doctor-center.dto';
import { DoctorCenterResponse, UpdateDoctorCenterDto } from '../dto/update-doctor-center.dto';
import { Doctor, DoctorCenter, DoctorCenterService, HealthCenter } from 'src/domain/index.domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorCenterServiceImpl implements DoctorCenterService{
 
  constructor(@InjectRepository(DoctorCenter) private doctorCenterRepository: Repository<DoctorCenter>,
  @InjectRepository(Doctor) private doctorRepository: Repository<Doctor>,
  @InjectRepository(HealthCenter) private healthCenterRepository: Repository<HealthCenter>){}
 
  async create(createDoctorCenterDto: CreateDoctorCenterDto) {
    try{
      const doctorExist = await this.doctorRepository.findOneBy({id:createDoctorCenterDto.doctorId});
      if(!doctorExist) return new DoctorCenterResponse(`Doctor with id ${createDoctorCenterDto.doctorId} was not found`);
      const centerExist = await this.healthCenterRepository.findOneBy({id: createDoctorCenterDto.healthCenterId});
      if(!centerExist) return new DoctorCenterResponse(`Health Center with id ${createDoctorCenterDto.healthCenterId} was not found`);

      const newDoctorCenter = await this.doctorCenterRepository.save({
        ...createDoctorCenterDto
      })
      return new DoctorCenterResponse('',newDoctorCenter);
    } catch(error){
      return new DoctorCenterResponse('An error occurred while saving doctor-center: '+error.message)
    }
  }

  findAll() {
    return this.doctorCenterRepository.find();
  }

  async findOne(id: number) {
    try{
      const doctorCenterExist = await this.doctorCenterRepository.findOneBy({id: id});
      if(!doctorCenterExist) return new DoctorCenterResponse(`Doctor-Center with id ${id} was not found`)

      return new DoctorCenterResponse('', doctorCenterExist);
    } catch(error){
      return new DoctorCenterResponse('An error occurred while finding doctor-center: '+error.message)
    }
  }

  async findAllByDoctorId(doctorId: number) {
    try{
      const doctorExist = await this.doctorRepository.findOneBy({id:doctorId});
      if(!doctorExist) return new DoctorCenterResponse(`Doctor with id ${doctorId} was not found`);
      const doctorCenters = await this.doctorCenterRepository.findBy({doctorId: doctorId});
      if(!doctorCenters) return new DoctorCenterResponse(`Doctor-Center with Doctor id ${doctorId} was not found`)

      return doctorCenters;
    } catch(error){
      return new DoctorCenterResponse('An error occurred while finding doctor-center: '+error.message)
    }
  }

  async findAllByHealthCenterId(centerId: number) {
    try{
      const centerExist = await this.healthCenterRepository.findOneBy({id: centerId});
      if(!centerExist) return new DoctorCenterResponse(`Health Center with id ${centerId} was not found`);
      const doctorCenters = await this.doctorCenterRepository.findBy({healthCenterId: centerId});
      if(!doctorCenters) return new DoctorCenterResponse(`Doctor-Center with Health-Center id ${centerId} was not found`)

      return {doctorCenters, success:true};
    } catch(error){
      return new DoctorCenterResponse('An error occurred while finding doctor-center: '+error.message)
    }
  }

  async findByIdAndDoctorId(doctorId: number, id: number) {
    try{
      const doctorExist = await this.doctorRepository.findOneBy({id:doctorId});
      if(!doctorExist) return new DoctorCenterResponse(`Doctor with id ${doctorId} was not found`);
      const doctorCenterExist = await this.doctorCenterRepository.findOne({where: {doctorId: doctorId, id: id}});
      if(!doctorCenterExist) return new DoctorCenterResponse(`Doctor-Center with Doctor id ${doctorId} was not found`)

      return new DoctorCenterResponse('', doctorCenterExist);
    } catch(error){
      return new DoctorCenterResponse('An error occurred while finding doctor-center: '+error.message)
    }
  }

  async findByIdAndHealthCenterId(centerId: number, id: number) {
    try{
      const centerExist = await this.healthCenterRepository.findOneBy({id: centerId});
      if(!centerExist) return new DoctorCenterResponse(`Health Center with id ${centerId} was not found`);
      const doctorCenterExist = await this.doctorCenterRepository.findOne({where:{healthCenterId: centerId, id: id}});
      if(!doctorCenterExist) return new DoctorCenterResponse(`Doctor-Center with Health-Center id ${centerId} was not found`)

      return new DoctorCenterResponse('', doctorCenterExist);
    } catch(error){
      return new DoctorCenterResponse('An error occurred while finding doctor-center: '+error.message)
    }
  }


  async update(id: number, updateDoctorCenterDto: UpdateDoctorCenterDto) {
    try{
      const doctorCenterExist = await this.doctorCenterRepository.findOneBy({id: id});
      if(!doctorCenterExist) return new DoctorCenterResponse(`Doctor-Center with id ${id} was not found`)
      const updateDoctorCenter = await this.doctorCenterRepository.save({
        id: id,
        ...updateDoctorCenterDto
      })
      return new DoctorCenterResponse('',updateDoctorCenter);
    } catch(error){
      return new DoctorCenterResponse('An error occurred while updating doctor-center: '+error.message)
    }
  }

  async remove(id: number) {
    try{
      const doctorCenterExist = await this.doctorCenterRepository.findOneBy({id: id});
      if(!doctorCenterExist) return new DoctorCenterResponse(`Doctor-Center with id ${id} was not found`)
      const deletedDoctorCenter = await this.doctorCenterRepository.delete({
        id: id
      })
      return {deletedDoctorCenter, success:true};
    } catch(error){
      return new DoctorCenterResponse('An error occurred while removing doctor-center: '+error.message)
    }
  }
}
