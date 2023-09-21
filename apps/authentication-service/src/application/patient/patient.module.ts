import { Module } from '@nestjs/common';
import { PatientServiceImpl } from '../index.application';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient, User } from 'src/domain/index.domain';
import { PatientController } from 'src/infrastructure/index.controller';


@Module({
  controllers: [PatientController],
  providers: [PatientServiceImpl],
  imports: [
    TypeOrmModule.forFeature([Patient]),
    TypeOrmModule.forFeature([User]),
  ]
})
export class PatientModule {}
