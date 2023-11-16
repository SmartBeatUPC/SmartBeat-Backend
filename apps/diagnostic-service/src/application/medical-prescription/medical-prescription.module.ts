import { Module } from '@nestjs/common';

import { MedicalPrescriptionServiceImpl } from '../index.application';
import { MedicalPrescriptionController } from 'src/infrastructure/index.controller';
import { Diagnostic, MedicalPrescription } from 'src/domain/index.domain';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  controllers: [MedicalPrescriptionController],
  providers: [MedicalPrescriptionServiceImpl],
  imports:[
    TypeOrmModule.forFeature([MedicalPrescription]),
    TypeOrmModule.forFeature([Diagnostic]),
  ]
})
export class MedicalPrescriptionModule {}
