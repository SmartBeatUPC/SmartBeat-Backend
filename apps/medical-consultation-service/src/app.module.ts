import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MedicalRecordModule } from './medical-record/medical-record.module';
import { MedicalConsultationModule } from './medical-consultation/medical-consultation.module';

@Module({
  imports: [MedicalRecordModule, MedicalConsultationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
