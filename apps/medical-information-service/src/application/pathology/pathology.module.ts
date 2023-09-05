import { Module } from '@nestjs/common';
import { PathologyServiceImpl } from './services/pathologyImpl.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalInformation, Pathology } from 'src/domain/index.domain';
import { PathologyController } from 'src/infrastructure/index.controller';

@Module({
  controllers: [PathologyController],
  providers: [PathologyServiceImpl],
  imports: [
    TypeOrmModule.forFeature([Pathology]),
    TypeOrmModule.forFeature([MedicalInformation])
  ]
})
export class PathologyModule {}
