import { Module } from '@nestjs/common';
import { DoctorCenterService } from './doctor-center.service';
import { DoctorCenterController } from './doctor-center.controller';

@Module({
  controllers: [DoctorCenterController],
  providers: [DoctorCenterService]
})
export class DoctorCenterModule {}
