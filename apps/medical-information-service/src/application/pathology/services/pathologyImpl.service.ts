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
      medicalInformationId: medicalInformationExist.id,
      ...createPathologyDto
      });
    return new PathologyResponse('',newPathology);
    }catch(error){
      return new PathologyResponse('An error occurred while creating Pathology: '+error.message);
    }
  }

  async registerPathologiesByMedicalInformationId(id: number, pathologies: any){
    try{

      const medicalInformationExist = await this.medicalInformationRepository.findOneBy({id:id})
      if(!medicalInformationExist) return new PathologyResponse(`Medical Information with id ${id} not found`)

      if(!pathologies || pathologies.length == 0) return new PathologyResponse(`No pathologies to be recorded`)

      let listPathologies = []
      for(let i=0; i< pathologies.length; i++){
        const newPathology = await this.pathologyRepository.save({
          medicalInformationId: medicalInformationExist.id,
          pathology: pathologies[i].pathology
          });
          listPathologies.push(newPathology);
      }
      
    return listPathologies;
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

      const PathologyExist = await this.pathologyRepository.findOneBy({medicalInformationId:informationId});
      if(!PathologyExist) return new PathologyResponse(`Pathology with Medical Information id ${informationId} not found`)
      return new PathologyResponse('',PathologyExist);
    }catch(error){
      return new PathologyResponse('An error occurred while finding Pathology: '+error.message);
    }
  }

  async findAllPathologiesByMedicalInformationId(informationId: number){
    try{

        const medicalInformationExist = await this.medicalInformationRepository.findOneBy({id:informationId})
        if(!medicalInformationExist) return new PathologyResponse(`Medical Information with id ${informationId} not found`)

        const listPathologies = await this.pathologyRepository.findBy({medicalInformationId:informationId});
        return listPathologies;
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
        medicalInformationId: PathologyExist.medicalInformationId,
        ...updatePathologyDto
      })
      return new PathologyResponse('',updatedPathology);
    }catch(error){
      return new PathologyResponse('An error occurred while updating Pathology: '+error.message);
    }
  }

  
}
