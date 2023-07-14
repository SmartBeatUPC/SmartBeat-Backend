import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DoctorCenterServiceImpl, CreateDoctorCenterDto, UpdateDoctorCenterDto } from 'src/application/index.application';


@Controller()
export class DoctorCenterController {
  constructor(private readonly doctorCenterService: DoctorCenterServiceImpl) {}

  @MessagePattern('createDoctorCenter')
  create(@Payload() createDoctorCenterDto: CreateDoctorCenterDto) {
    return this.doctorCenterService.create(createDoctorCenterDto);
  }

  @MessagePattern('findAllDoctorCenter')
  findAll() {
    return this.doctorCenterService.findAll();
  }

  @MessagePattern('findOneDoctorCenter')
  findOne(@Payload() id: number) {
    return this.doctorCenterService.findOne(id);
  }

  @MessagePattern('updateDoctorCenter')
  update(@Payload() updateDoctorCenterDto: UpdateDoctorCenterDto) {
    return this.doctorCenterService.update(updateDoctorCenterDto.id, updateDoctorCenterDto);
  }

  @MessagePattern('removeDoctorCenter')
  remove(@Payload() id: number) {
    return this.doctorCenterService.remove(id);
  }
}
