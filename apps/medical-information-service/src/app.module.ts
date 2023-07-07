import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PathologyModule } from './pathology/pathology.module';
import { PpgModule } from './ppg/ppg.module';
import { MedicalInformationModule } from './medical-information/medical-information.module';

@Module({
  imports: [PathologyModule, PpgModule, MedicalInformationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
