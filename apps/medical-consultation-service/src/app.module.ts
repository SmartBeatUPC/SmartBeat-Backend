import { Module } from '@nestjs/common';
import { MedicalRecordModule } from './application/medical-record/medical-record.module';
import { MedicalConsultationModule } from './application/medical-consultation/medical-consultation.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ConfigModule.forRoot(), MedicalRecordModule, MedicalConsultationModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
