import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Controller()
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @MessagePattern('createDoctor')
  create(@Payload() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @MessagePattern('findAllDoctor')
  findAll() {
    return this.doctorService.findAll();
  }

  @MessagePattern('findOneDoctor')
  findOne(@Payload() id: number) {
    return this.doctorService.findOne(id);
  }

  @MessagePattern('updateDoctor')
  update(@Payload() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(updateDoctorDto.id, updateDoctorDto);
  }

  @MessagePattern('removeDoctor')
  remove(@Payload() id: number) {
    return this.doctorService.remove(id);
  }
}
