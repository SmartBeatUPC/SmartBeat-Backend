import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DoctorCenterServiceImpl, CreateDoctorCenterDto, UpdateDoctorCenterDto } from 'src/application/index.application';


@Controller()
export class DoctorCenterController {
  constructor(private readonly doctorCenterService: DoctorCenterServiceImpl) {}

  @MessagePattern({cmd: 'createDoctorCenter'})
  create(createDoctorCenterDto: CreateDoctorCenterDto) {
    return this.doctorCenterService.create(createDoctorCenterDto);
  }

  @MessagePattern({cmd: 'findAllDoctorCenters'})
  findAll() {
    return this.doctorCenterService.findAll();
  }

  @MessagePattern({cmd: 'findOneDoctorCenter'})
  findOne(id: number) {
    return this.doctorCenterService.findOne(id);
  }

  @MessagePattern({cmd: 'findAllDoctorCentersByDoctorId'})
  findAllByDoctorId(doctorId: number) {
    return this.doctorCenterService.findAllByDoctorId(doctorId);
  }

  @MessagePattern({cmd: 'findDoctorCenterByIdAndDoctorId'})
  findByIdAndDoctorId(data: {doctorId: number, id: number}) {
    const {doctorId, id} = data
    return this.doctorCenterService.findByIdAndDoctorId(doctorId, id);
  }

  @MessagePattern({cmd: 'findDoctorCenterByIdAndHealthCenterId'})
  findByIdAndHealthCenterId(data: {centerId: number, id: number}) {
    const {centerId, id} = data
    return this.doctorCenterService.findByIdAndHealthCenterId(centerId, id);
  }

  @MessagePattern({cmd: 'findAllDoctorCentersByHealthCenterId'})
  findAllByHealthCenterId(centerId: number) {
    return this.doctorCenterService.findAllByHealthCenterId(centerId);
  }

  @MessagePattern({cmd: 'updateDoctorCenter'})
  update(data: {id: number, updateDoctorCenterDto: UpdateDoctorCenterDto}) {
    const {id, updateDoctorCenterDto} = data
    return this.doctorCenterService.update(id, updateDoctorCenterDto);
  }

  @MessagePattern({cmd: 'removeDoctorCenter'})
  remove(id: number) {
    return this.doctorCenterService.remove(id);
  }
}
