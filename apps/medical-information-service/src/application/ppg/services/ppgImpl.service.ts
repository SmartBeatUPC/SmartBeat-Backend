import { Injectable } from '@nestjs/common';
import { CreatePpgDto } from '../dto/create-ppg.dto';
import { PpgResponse, UpdatePpgDto } from '../dto/update-ppg.dto';
import { MedicalInformation, Ppg, PpgService } from 'src/domain/index.domain';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalInformationResponse } from 'src/application/medical-information/dto/update-medical-information.dto';
import { Repository } from 'typeorm';

@Injectable()
export class PpgServiceImpl implements PpgService{

  constructor(@InjectRepository(MedicalInformation) private medicalInformationRepository: Repository<MedicalInformation>,
  @InjectRepository(Ppg) private ppgRepository: Repository<Ppg>){}

  async create(informationId: number, createPpgDto: CreatePpgDto) {
    try{

      const medicalInformationExist = await this.medicalInformationRepository.findOneBy({id:informationId})
      if(!medicalInformationExist) return new PpgResponse(`Medical Information with id ${informationId} not found`)

      const newPPG = await this.ppgRepository.save({
      bloodPressureSistolic: createPpgDto.bloodPressureSistolic,
      bloodPressureDiastolic: createPpgDto.bloodPressureDiastolic,
      heartRate: createPpgDto.heartRate,
      medical_information_id: medicalInformationExist.id
      });
    return new PpgResponse('',newPPG);
    }catch(error){
      return new PpgResponse('An error occurred while creating PPG: '+error.message);
    }
  }

  async findPPGByInformationId(informationId: number) {
    try{

      const medicalInformationExist = await this.medicalInformationRepository.findOneBy({id:informationId})
      if(!medicalInformationExist) return new PpgResponse(`Medical Information with id ${informationId} not found`)

      const PPGExist = await this.ppgRepository.findOneBy({medical_information_id:informationId});
      if(!PPGExist) return new PpgResponse(`PPG with Medical Information id ${informationId} not found`)
      return new PpgResponse('',PPGExist);
    }catch(error){
      return new PpgResponse('An error occurred while finding PPG: '+error.message);
    }
  }

  async update(id: number, updatePpgDto: UpdatePpgDto) {
    try{
      const PPGExist = await this.ppgRepository.findOneBy({id:id});
      if(!PPGExist) return new PpgResponse(`PPG with id ${id} not found`)

      const updatedPPG = await this.ppgRepository.save({
        id: PPGExist.id,
        bloodPressureSistolic: updatePpgDto.bloodPressureSistolic,
        bloodPressureDiastolic: updatePpgDto.bloodPressureDiastolic,
        heartRate: updatePpgDto.heartRate,
        medical_information_id: PPGExist.medical_information_id
      })
      return new PpgResponse('',updatedPPG);
    }catch(error){
      return new PpgResponse('An error occurred while updating PPG: '+error.message);
    }
  }

}
