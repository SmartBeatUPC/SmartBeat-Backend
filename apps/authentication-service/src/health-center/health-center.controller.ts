import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { HealthCenterService } from './health-center.service';
import { CreateHealthCenterDto } from './dto/create-health-center.dto';
import { UpdateHealthCenterDto } from './dto/update-health-center.dto';

@Controller()
export class HealthCenterController {
  constructor(private readonly healthCenterService: HealthCenterService) {}

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
