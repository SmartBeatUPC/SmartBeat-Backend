import { Module } from '@nestjs/common';
import { MedicalRecordServiceImpl } from './services/medical-recordImpl.service';
import { MedicalRecordController } from 'src/infrastructure/index.controller';
import { MedicalRecord } from 'src/domain/index.domain';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  controllers: [MedicalRecordController],
  providers: [MedicalRecordServiceImpl],
  imports: [
    TypeOrmModule.forFeature([MedicalRecord])
  ]
})
export class MedicalRecordModule {}
