import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiagnosticModule } from './diagnostic/diagnostic.module';
import { MedicalPrescriptionModule } from './medical-prescription/medical-prescription.module';

@Module({
  imports: [DiagnosticModule, MedicalPrescriptionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
