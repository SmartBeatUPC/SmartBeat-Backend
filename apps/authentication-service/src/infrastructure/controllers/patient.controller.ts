import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PatientServiceImpl, CreatePatientDto, UpdatePatientDto } from 'src/application/index.application';


@Controller()
export class PatientController {
  constructor(private readonly patientService: PatientServiceImpl) {}

  @MessagePattern({cmd: 'createPatient'})
  create(createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @MessagePattern({cmd: 'findAllPatients'})
  findAll() {
    return this.patientService.findAll();
  }

  @MessagePattern({cmd: 'findOnePatient'})
  findOne(id: number) {
    return this.patientService.findOne(id);
  }

  @MessagePattern({cmd: 'findOnePatientByUserId'})
  findByUserId(userId: number) {
    return this.patientService.findByUserId(userId);
  }

  @MessagePattern({cmd: 'updatePatient'})
  update(data: {id: number, updatePatientDto: UpdatePatientDto}) {
    const {id, updatePatientDto} = data
    return this.patientService.update(id, updatePatientDto);
  }

  @MessagePattern({cmd: 'removePatient'})
  remove(id: number) {
    return this.patientService.remove(id);
  }
}
