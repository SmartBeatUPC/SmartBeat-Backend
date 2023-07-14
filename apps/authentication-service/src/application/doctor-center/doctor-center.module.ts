import { Module } from '@nestjs/common';
import { DoctorCenterServiceImpl } from '../index.application';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorCenter } from 'src/domain/index.domain';
import { DoctorCenterController } from 'src/infrastructure/index.controller';

@Module({
  controllers: [DoctorCenterController],
  providers: [DoctorCenterServiceImpl],
  imports: [
    TypeOrmModule.forFeature([DoctorCenter])
  ]
})
export class DoctorCenterModule {}
