import { Module } from '@nestjs/common';
import { PathologyModule } from './application/pathology/pathology.module';
import { PpgModule } from './application/ppg/ppg.module';
import { MedicalInformationModule } from './application/medical-information/medical-information.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), PathologyModule, PpgModule, MedicalInformationModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
