import { Module } from '@nestjs/common';
import { PpgServiceImpl } from './services/ppgImpl.service';
import { PpgController } from 'src/infrastructure/index.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalInformation, Ppg } from 'src/domain/index.domain';


@Module({
  controllers: [PpgController],
  providers: [PpgServiceImpl],
  imports: [
    TypeOrmModule.forFeature([Ppg]),
    TypeOrmModule.forFeature([MedicalInformation]),
  ]
})
export class PpgModule {}
