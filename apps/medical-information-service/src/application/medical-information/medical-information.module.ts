import { Module } from '@nestjs/common';
import { MedicalInformationServiceImpl } from './services/medical-informationImpl.service';
import { MedicalInformation, Pathology, Ppg } from 'src/domain/index.domain';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalInformationController } from 'src/infrastructure/index.controller';

@Module({
  controllers: [MedicalInformationController],
  providers: [MedicalInformationServiceImpl],
  imports: [
    TypeOrmModule.forFeature([MedicalInformation]),
    TypeOrmModule.forFeature([Pathology]),
    TypeOrmModule.forFeature([Ppg])
  ]
})
export class MedicalInformationModule {}
