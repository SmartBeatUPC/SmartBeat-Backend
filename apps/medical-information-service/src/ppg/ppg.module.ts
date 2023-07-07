import { Module } from '@nestjs/common';
import { PpgService } from './ppg.service';
import { PpgController } from './ppg.controller';

@Module({
  controllers: [PpgController],
  providers: [PpgService]
})
export class PpgModule {}
