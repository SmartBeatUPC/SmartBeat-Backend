import { Module } from '@nestjs/common';
import { RecommendationServiceImpl } from './services/recommendationImpl.service';
import { RecommendationController } from 'src/infrastructure/index.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recommendation } from 'src/domain/index.domain';
import { PatientClient } from 'src/shared/patient/patient.client';
import { MedicalInformationClient } from 'src/shared/medical-information/medical-information.client';

@Module({
  controllers: [RecommendationController],
  providers: [RecommendationServiceImpl,
  PatientClient,
  MedicalInformationClient],
  imports:[
    TypeOrmModule.forFeature([Recommendation])
  ]
})
export class RecommendationModule {}
