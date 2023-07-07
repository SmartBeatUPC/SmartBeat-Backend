import { Injectable } from '@nestjs/common';
import { CreateDoctorCenterDto } from './dto/create-doctor-center.dto';
import { UpdateDoctorCenterDto } from './dto/update-doctor-center.dto';

@Injectable()
export class DoctorCenterService {
  create(createDoctorCenterDto: CreateDoctorCenterDto) {
    return 'This action adds a new doctorCenter';
  }

  findAll() {
    return `This action returns all doctorCenter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} doctorCenter`;
  }

  update(id: number, updateDoctorCenterDto: UpdateDoctorCenterDto) {
    return `This action updates a #${id} doctorCenter`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctorCenter`;
  }
}
