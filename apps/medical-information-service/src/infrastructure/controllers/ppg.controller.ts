import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PpgServiceImpl, CreatePpgDto, UpdatePpgDto } from 'src/application/index.application';


@Controller()
export class PpgController {
  constructor(private readonly ppgService: PpgServiceImpl) {}

  @MessagePattern({cmd: 'createPpg'})
  create(data:{id: number,createPpgDto: CreatePpgDto}) {
    const {id, createPpgDto} = data
    return this.ppgService.create(id, createPpgDto);
  }

  @MessagePattern({cmd: 'findPPGByInformationId'})
  findPPGByInformationId(id: number) {
    return this.ppgService.findPPGByInformationId(id);
  }

  @MessagePattern({cmd: 'findAllPPGByMedicalConsultationIdV2'})
  findAllPPGByMedicalConsultationIdV2(data: {id: number, requestFilterLastMedicalInformationDto: any}) {
    const {id, requestFilterLastMedicalInformationDto} = data
    return this.ppgService.findAllPPGByConsultationId(id, requestFilterLastMedicalInformationDto.filter);
  }

  @MessagePattern({cmd: 'findAllPPGByMedicalConsultationId'})
  findAllPPGByMedicalConsultationId(data: {id: number, filter: number}) {
    const {id, filter} = data
    return this.ppgService.findAllPPGByConsultationId(id, filter);
  }


  @MessagePattern({cmd: 'updatePpg'})
  update(data: {id: number, updatePpgDto: UpdatePpgDto}) {
    const {id, updatePpgDto} = data
    return this.ppgService.update(id, updatePpgDto);
  }

  @MessagePattern({cmd: 'clasificateBloodPressure'})
  clasificateBloodPressure(bloodPressure: CreatePpgDto) {
    return this.ppgService.clasificateBloodPressure(bloodPressure.bloodPressureSistolic, bloodPressure.bloodPressureDiastolic);
  }

}
