import { Module } from '@nestjs/common';

import { MedicalPrescriptionServiceImpl } from '../index.application';
import { MedicalPrescriptionController } from 'src/infrastructure/index.controller';
import { MedicalPrescription } from 'src/domain/index.domain';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  controllers: [MedicalPrescriptionController],
  providers: [MedicalPrescriptionServiceImpl],
  imports:[
    TypeOrmModule.forFeature([MedicalPrescription])
  ]
})
export class MedicalPrescriptionModule {}
