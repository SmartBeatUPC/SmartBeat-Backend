import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PpgServiceImpl, CreatePpgDto, UpdatePpgDto } from 'src/application/index.application';


@Controller()
export class PpgController {
  constructor(private readonly ppgService: PpgServiceImpl) {}

  @MessagePattern({cmd: 'createPpg'})
  create(data:{informationId: number,createPpgDto: CreatePpgDto}) {
    const {informationId, createPpgDto} = data
    return this.ppgService.create(informationId, createPpgDto);
  }

  @MessagePattern({cmd: 'findPPGByInformationId'})
  findPPGByInformationId(informationId: number) {
    return this.ppgService.findPPGByInformationId(informationId);
  }

  @MessagePattern({cmd: 'updatePpg'})
  update(data: {id: number, updatePpgDto: UpdatePpgDto}) {
    const {id, updatePpgDto} = data
    return this.ppgService.update(id, updatePpgDto);
  }

}
