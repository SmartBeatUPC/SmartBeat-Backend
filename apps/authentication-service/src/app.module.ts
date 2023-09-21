import { Module } from '@nestjs/common';
import { DoctorCenterModule } from './application/doctor-center/doctor-center.module';
import { DoctorModule } from './application/doctor/doctor.module';
import { HealthCenterModule } from './application/health-center/health-center.module';
import { PatientModule } from './application/patient/patient.module';
import { UserModule } from './application/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infrastructure/database/database.module';


@Module({
  imports: [ConfigModule.forRoot(), PatientModule, DoctorModule, UserModule, DoctorCenterModule, HealthCenterModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
