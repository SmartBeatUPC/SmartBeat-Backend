import { Injectable } from '@nestjs/common';
import { MedicalInformation, Pathology, PathologyService } from 'src/domain/index.domain';
import { CreatePathologyDto } from '../dto/create-pathology.dto';
import { PathologyResponse, UpdatePathologyDto } from '../dto/update-pathology.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PathologyServiceImpl implements PathologyService{

  constructor(@InjectRepository(Pathology) private pathologyRepository: Repository<Pathology>,
  @InjectRepository(MedicalInformation) private medicalInformationRepository: Repository<MedicalInformation>){}
  

  async create(informationId: number, createPathologyDto: CreatePathologyDto) {
    try{

      const medicalInformationExist = await this.medicalInformationRepository.findOneBy({id:informationId})
      if(!medicalInformationExist) return new PathologyResponse(`Medical Information with id ${informationId} not found`)

      const newPathology = await this.pathologyRepository.save({
      medical_information_id: medicalInformationExist.id,
      ...createPathologyDto
      });
    return new PathologyResponse('',newPathology);
    }catch(error){
      return new PathologyResponse('An error occurred while creating Pathology: '+error.message);
    }
  }

  findAll() {
    return this.pathologyRepository.find();
  }

  async findPathologyByMedicalInformationId(informationId: number) {
    try{

      const medicalInformationExist = await this.medicalInformationRepository.findOneBy({id:informationId})
      if(!medicalInformationExist) return new PathologyResponse(`Medical Information with id ${informationId} not found`)

      const PathologyExist = await this.pathologyRepository.findOneBy({medical_information_id:informationId});
      if(!PathologyExist) return new PathologyResponse(`Pathology with Medical Information id ${informationId} not found`)
      return new PathologyResponse('',PathologyExist);
    }catch(error){
      return new PathologyResponse('An error occurred while finding Pathology: '+error.message);
    }
  }

  async update(id: number, updatePathologyDto: UpdatePathologyDto) {
    try{
      const PathologyExist = await this.pathologyRepository.findOneBy({id:id});
      if(!PathologyExist) return new PathologyResponse(`Pathology with id ${id} not found`)

      const updatedPathology = await this.pathologyRepository.save({
        id: PathologyExist.id,
        medical_information_id: PathologyExist.medical_information_id,
        ...updatePathologyDto
      })
      return new PathologyResponse('',updatedPathology);
    }catch(error){
      return new PathologyResponse('An error occurred while updating Pathology: '+error.message);
    }
  }

  
}
