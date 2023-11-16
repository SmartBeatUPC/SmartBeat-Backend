import { Module } from '@nestjs/common';
import { MedicalInformationServiceImpl } from './services/medical-informationImpl.service';
import { MedicalInformation, Pathology, Ppg } from 'src/domain/index.domain';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalInformationController } from 'src/infrastructure/index.controller';
import { MedicalRecordClient } from 'src/shared/medical-record/medical-record.client';
import { DiagnosticClient } from 'src/shared/diagnostic/diagnostic.client';

@Module({
  controllers: [MedicalInformationController],
  providers: [
    MedicalInformationServiceImpl,
    MedicalRecordClient,
    DiagnosticClient
  ],
  imports: [
    TypeOrmModule.forFeature([MedicalInformation]),
    TypeOrmModule.forFeature([Pathology]),
    TypeOrmModule.forFeature([Ppg])
  ]
})
export class MedicalInformationModule {}
