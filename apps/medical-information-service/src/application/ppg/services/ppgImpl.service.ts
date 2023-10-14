import { Injectable } from '@nestjs/common';
import { CreatePpgDto } from '../dto/create-ppg.dto';
import { PpgResponse, UpdatePpgDto } from '../dto/update-ppg.dto';
import { MedicalInformation, Ppg, PpgService } from 'src/domain/index.domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalRecordClient } from 'src/shared/medical-record/medical-record.client';
import { format } from 'date-fns';
import { rangosPresion } from '../blood-pressure-clasification';

@Injectable()
export class PpgServiceImpl implements PpgService{

  constructor(@InjectRepository(MedicalInformation) private medicalInformationRepository: Repository<MedicalInformation>,
  @InjectRepository(Ppg) private ppgRepository: Repository<Ppg>,
  private medicalRecordClient: MedicalRecordClient){}

  async create(informationId: number, createPpgDto: CreatePpgDto) {
    try{

      const medicalInformationExist = await this.medicalInformationRepository.findOneBy({id:informationId})
      if(!medicalInformationExist) return new PpgResponse(`Medical Information with id ${informationId} not found`)
      const ppgExistPrev = await this.ppgRepository.findOneBy({medicalInformationId: medicalInformationExist.id});
      if(ppgExistPrev) return new PpgResponse(`PPG with Medical Information id ${informationId} is registered. Please, use the update service`)
      const newPPG = await this.ppgRepository.save({
      ...createPpgDto,
      ppgDate: new Date(),
      medicalInformationId: medicalInformationExist.id
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

      const PPGExist = await this.ppgRepository.findOneBy({medicalInformationId:informationId});
      if(!PPGExist) return new PpgResponse(`PPG with Medical Information id ${informationId} not found`)
      return new PpgResponse('',PPGExist);
    }catch(error){
      return new PpgResponse('An error occurred while finding PPG: '+error.message);
    }
  }

  async findAllPPGByConsultationId(consultationId: number){
    const medicalRecordsResponse = await this.medicalRecordClient.findAllMedicalRecordsByMedicalConsultationId(consultationId);

    if(!medicalRecordsResponse.medicalRecords || medicalRecordsResponse.medicalRecords.length == 0) return new PpgResponse(medicalRecordsResponse.message);

    let ppgList = [];
    let i: number;
    console.log(medicalRecordsResponse.medicalRecords.length);
    for(i=0; i<medicalRecordsResponse.medicalRecords.length;i++){
      let medicalInformationExist = await this.medicalInformationRepository.findOneBy({medicalRecordId: medicalRecordsResponse.medicalRecords[i].id})
      if(medicalInformationExist){
        let ppg = await this.ppgRepository.findOneBy({medicalInformationId: medicalInformationExist.id});
        console.log(ppg)
        if(ppg) {
          let ppgDateChanged = format(new Date(ppg.ppgDate), 'yyyy/MM/dd');
          let medicalRecordId = medicalInformationExist.medicalRecordId;
          let resultPpg = ppg.bloodPressureSistolic - ppg.bloodPressureDiastolic;
          let ppgClasification = await this.clasificateBloodPressure(ppg.bloodPressureSistolic, ppg.bloodPressureDiastolic);
          ppgList.push({ ppg: {
            ...ppg,
            ppgDate: ppgDateChanged,
            ppgBar:resultPpg,
            ppgClasification: ppgClasification,
          }, medicalRecordId});
        }
      }
    }
    if(!ppgList || ppgList.length == 0) return new PpgResponse(`PPGs were not recorded in this Medical Consultation Id ${consultationId}.`);
    return {ppgs: ppgList, success: true};
  }


  async clasificateBloodPressure(sistolica: number, diastolica: number) {
    const clasificacion = rangosPresion.find((rango) => {
      return (
        sistolica >= rango.minSistolica &&
        sistolica <= rango.maxSistolica &&
        diastolica >= rango.minDiastolica &&
        diastolica <= rango.maxDiastolica
      );
    });
    if (clasificacion) {
      return clasificacion.clasificacion;
    } else {
      return 'No clasificado';
    }
  }

  async update(id: number, updatePpgDto: UpdatePpgDto) {
    try{
      const PPGExist = await this.ppgRepository.findOneBy({id:id});
      if(!PPGExist) return new PpgResponse(`PPG with id ${id} not found`)

      const updatedPPG = await this.ppgRepository.save({
        id: PPGExist.id,
        ppgDate: new Date(),
        ...updatePpgDto,
        medicalInformationId: PPGExist.medicalInformationId
      })
      return new PpgResponse('',updatedPPG);
    }catch(error){
      return new PpgResponse('An error occurred while updating PPG: '+error.message);
    }
  }

}
