import { Module } from '@nestjs/common';
import { DiagnosticServiceImpl } from './services/diagnosticImpl.service';
import { DiagnosticController } from 'src/infrastructure/index.controller';
import { Diagnostic, MedicalPrescription } from 'src/domain/index.domain';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  controllers: [DiagnosticController],
  providers: [DiagnosticServiceImpl],
  imports:[
    TypeOrmModule.forFeature([Diagnostic]),
    TypeOrmModule.forFeature([MedicalPrescription]),
  ]
})
export class DiagnosticModule {}
