import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';
import { UserModule } from './user/user.module';
import { DoctorCenterModule } from './doctor-center/doctor-center.module';
import { HealthCenterModule } from './health-center/health-center.module';

@Module({
  imports: [PatientModule, DoctorModule, UserModule, DoctorCenterModule, HealthCenterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
