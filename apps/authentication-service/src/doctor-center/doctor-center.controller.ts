import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DoctorCenterService } from './doctor-center.service';
import { CreateDoctorCenterDto } from './dto/create-doctor-center.dto';
import { UpdateDoctorCenterDto } from './dto/update-doctor-center.dto';

@Controller()
export class DoctorCenterController {
  constructor(private readonly doctorCenterService: DoctorCenterService) {}

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
