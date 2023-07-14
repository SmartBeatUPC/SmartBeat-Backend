import { Module } from '@nestjs/common';
import { MedicalConsultationServiceImpl } from '../index.application';
import { MedicalConsultationController } from 'src/infrastructure/index.controller';
import { MedicalConsultation } from 'src/domain/index.domain';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  controllers: [MedicalConsultationController],
  providers: [MedicalConsultationServiceImpl],
  imports:[
    TypeOrmModule.forFeature([MedicalConsultation])
  ]
})
export class MedicalConsultationModule {}
