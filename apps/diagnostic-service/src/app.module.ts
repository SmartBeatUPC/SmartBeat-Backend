import { Module } from '@nestjs/common';
import { DiagnosticModule } from './application/diagnostic/diagnostic.module';
import { MedicalPrescriptionModule } from './application/medical-prescription/medical-prescription.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), DiagnosticModule, MedicalPrescriptionModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
