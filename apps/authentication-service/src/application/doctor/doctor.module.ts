import { Module } from '@nestjs/common';
import { DoctorServiceImpl } from '../index.application';
import { DoctorController } from 'src/infrastructure/index.controller';
import { Doctor } from 'src/domain/index.domain';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [DoctorController],
  providers: [DoctorServiceImpl],
  imports: [
    TypeOrmModule.forFeature([Doctor])
  ]
})
export class DoctorModule {}
