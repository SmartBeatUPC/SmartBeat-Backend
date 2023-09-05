import { Injectable } from '@nestjs/common';
import { CreateHealthCenterDto } from '../dto/create-health-center.dto';
import { HealthCenterResponse, UpdateHealthCenterDto } from '../dto/update-health-center.dto';
import { HealthCenterService } from 'src/domain/health-center/services/health-center.interface.service';
import { InjectRepository } from '@nestjs/typeorm';
import { HealthCenter } from 'src/domain/index.domain';
import { Repository } from 'typeorm';

@Injectable()
export class HealthCenterServiceImpl implements HealthCenterService {
  constructor(@InjectRepository(HealthCenter) private healthCenterRepository: Repository<HealthCenter>){}

  async create(createHealthCenterDto: CreateHealthCenterDto) {
    try{
      const newHealthCenter = await this.healthCenterRepository.save({
        ...createHealthCenterDto
      })
      return new HealthCenterResponse('',newHealthCenter);
    }catch(error){
      return new HealthCenterResponse('An error occurred while saving health-center: '+error.message)
    }
  }

  findAll() {
    return this.healthCenterRepository.find();
  }

  async findOne(id: number) {
    try{
      const HealthCenterExist = await this.healthCenterRepository.findOneBy({id: id});
      if(!HealthCenterExist) return new HealthCenterResponse(`Health Center with id ${id} was not found`);
      return new HealthCenterResponse('',HealthCenterExist);
    }catch(error){
      return new HealthCenterResponse('An error occurred while finding health-center: '+error.message)
    }
  }

  async update(id: number, updateHealthCenterDto: UpdateHealthCenterDto) {
    try{
      const HealthCenterExist = await this.healthCenterRepository.findOneBy({id: id});
      if(!HealthCenterExist) return new HealthCenterResponse(`Health Center with id ${id} was not found`);
      const updatedHealthCenter = await this.healthCenterRepository.save({
        id: id,
        ...updateHealthCenterDto
      })
      return new HealthCenterResponse('',updatedHealthCenter)

    }catch(error){
      return new HealthCenterResponse('An error occurred while updating health-center: '+error.message)
    }
  }

  async remove(id: number) {
    try{
      const HealthCenterExist = await this.healthCenterRepository.findOneBy({id: id});
      if(!HealthCenterExist) return new HealthCenterResponse(`Health Center with id ${id} was not found`);
      const deletedHealthCenter = await this.healthCenterRepository.delete({
        id: id
      })
      return deletedHealthCenter;

    }catch(error){
      return new HealthCenterResponse('An error occurred while deleting health-center: '+error.message)
    }
  }
}
