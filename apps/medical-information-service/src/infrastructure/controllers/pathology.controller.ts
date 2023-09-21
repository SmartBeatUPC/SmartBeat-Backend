import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreatePathologyDto, PathologyServiceImpl, UpdatePathologyDto } from 'src/application/index.application';

@Controller()
export class PathologyController {
  constructor(private readonly pathologyService: PathologyServiceImpl) {}

  @MessagePattern({cmd: 'createPathology'})
  create(data: {informationId: number, createPathologyDto: CreatePathologyDto}) {
    const {informationId, createPathologyDto} = data
    return this.pathologyService.create(informationId ,createPathologyDto);
  }

  @MessagePattern({cmd: 'findAllPathology'})
  findAll() {
    return this.pathologyService.findAll();
  }

  @MessagePattern({cmd: 'findPathologyByMedicalInformationId'})
  findPathologyByMedicalInformationId(informationId: number) {
    return this.pathologyService.findPathologyByMedicalInformationId(informationId);
  }

  @MessagePattern({cmd: 'updatePathology'})
  update(data: {id: number, updatePathologyDto: UpdatePathologyDto}) {
    const {id, updatePathologyDto} = data
    return this.pathologyService.update(id, updatePathologyDto);
  }

}
