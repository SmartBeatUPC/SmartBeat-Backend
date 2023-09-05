import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DoctorServiceImpl, CreateDoctorDto, UpdateDoctorDto } from 'src/application/index.application';


@Controller()
export class DoctorController {
  constructor(private readonly doctorService: DoctorServiceImpl) {}

  @MessagePattern('createDoctor')
  create(createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @MessagePattern({cmd: 'findAllDoctors'})
  findAll() {
    return this.doctorService.findAll();
  }

  @MessagePattern({cmd: 'findOneDoctor'})
  findOne(id: number) {
    return this.doctorService.findOne(id);
  }

  @MessagePattern({cmd: 'findOneDoctorByUserId'})
  findByUserId(userId: number) {
    return this.doctorService.findByUserId(userId);
  }

  @MessagePattern({cmd: 'updateDoctor'})
  update(data: {id: number, updateDoctorDto: UpdateDoctorDto}) {
    const {id, updateDoctorDto} = data
    return this.doctorService.update(id, updateDoctorDto);
  }

  @MessagePattern({cmd: 'removeDoctor'})
  remove(id: number) {
    return this.doctorService.remove(id);
  }
}
