import { Module } from '@nestjs/common';
import { MedicalConsultationServiceImpl } from '../index.application';
import { MedicalConsultationController } from 'src/infrastructure/index.controller';
import { MedicalConsultation, MedicalRecord } from 'src/domain/index.domain';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientClient } from 'shared/patient/patient.client';
import { DoctorClient } from 'shared/doctor/doctor.client';


@Module({
  controllers: [MedicalConsultationController],
  providers: [MedicalConsultationServiceImpl,
  PatientClient,
  DoctorClient],
  imports:[
    TypeOrmModule.forFeature([MedicalConsultation]),
    TypeOrmModule.forFeature([MedicalRecord])
  ]
})
export class MedicalConsultationModule {}
