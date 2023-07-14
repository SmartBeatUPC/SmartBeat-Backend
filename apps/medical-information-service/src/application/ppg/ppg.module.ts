import { Module } from '@nestjs/common';
import { PpgServiceImpl } from './services/ppgImpl.service';
import { PpgController } from 'src/infrastructure/index.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ppg } from 'src/domain/index.domain';


@Module({
  controllers: [PpgController],
  providers: [PpgServiceImpl],
  imports: [
    TypeOrmModule.forFeature([Ppg])
  ]
})
export class PpgModule {}
