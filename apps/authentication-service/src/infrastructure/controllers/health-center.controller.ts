import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { HealthCenterServiceImpl, CreateHealthCenterDto, UpdateHealthCenterDto } from 'src/application/index.application';


@Controller()
export class HealthCenterController {
  constructor(private readonly healthCenterService: HealthCenterServiceImpl) {}

  @MessagePattern({cmd: 'createHealthCenter'})
  create(createHealthCenterDto: CreateHealthCenterDto) {
    return this.healthCenterService.create(createHealthCenterDto);
  }

  @MessagePattern({cmd: 'findAllHealthCenters'})
  findAll() {
    return this.healthCenterService.findAll();
  }

  @MessagePattern({cmd: 'findOneHealthCenter'})
  findOne(id: number) {
    return this.healthCenterService.findOne(id);
  }

  @MessagePattern({cmd: 'updateHealthCenter'})
  update(data: {id: number, updateHealthCenterDto: UpdateHealthCenterDto}) {
    const {id, updateHealthCenterDto} = data
    return this.healthCenterService.update(id, updateHealthCenterDto);
  }

  @MessagePattern({cmd: 'removeHealthCenter'})
  remove(id: number) {
    return this.healthCenterService.remove(id);
  }
}
