import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { HealthCenterServiceImpl, CreateHealthCenterDto, UpdateHealthCenterDto } from 'src/application/index.application';


@Controller()
export class HealthCenterController {
  constructor(private readonly healthCenterService: HealthCenterServiceImpl) {}

  @MessagePattern('createHealthCenter')
  create(@Payload() createHealthCenterDto: CreateHealthCenterDto) {
    return this.healthCenterService.create(createHealthCenterDto);
  }

  @MessagePattern('findAllHealthCenter')
  findAll() {
    return this.healthCenterService.findAll();
  }

  @MessagePattern('findOneHealthCenter')
  findOne(@Payload() id: number) {
    return this.healthCenterService.findOne(id);
  }

  @MessagePattern('updateHealthCenter')
  update(@Payload() updateHealthCenterDto: UpdateHealthCenterDto) {
    return this.healthCenterService.update(updateHealthCenterDto.id, updateHealthCenterDto);
  }

  @MessagePattern('removeHealthCenter')
  remove(@Payload() id: number) {
    return this.healthCenterService.remove(id);
  }
}
