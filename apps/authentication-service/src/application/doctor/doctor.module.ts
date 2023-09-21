import { Module } from '@nestjs/common';
import { DoctorServiceImpl } from '../index.application';
import { DoctorController } from 'src/infrastructure/index.controller';
import { Doctor, User } from 'src/domain/index.domain';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [DoctorController],
  providers: [DoctorServiceImpl],
  imports: [
    TypeOrmModule.forFeature([Doctor]),
    TypeOrmModule.forFeature([User]),
  ]
})
export class DoctorModule {}
