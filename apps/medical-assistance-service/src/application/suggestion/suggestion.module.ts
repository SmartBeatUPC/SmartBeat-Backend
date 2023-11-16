import { Module } from '@nestjs/common';
import { SuggestionServiceImpl } from './services/suggestionImpl.service';
import { SuggestionController } from 'src/infrastructure/index.controller';
import { Suggestion } from 'src/domain/index.domain';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalInformationClient } from 'src/shared/medical-information/medical-information.client';
import { PatientClient } from 'src/shared/patient/patient.client';


@Module({
  controllers: [SuggestionController],
  providers: [SuggestionServiceImpl,
    PatientClient,
    MedicalInformationClient],
  imports:[
    TypeOrmModule.forFeature([Suggestion])
  ]
})
export class SuggestionModule {}
