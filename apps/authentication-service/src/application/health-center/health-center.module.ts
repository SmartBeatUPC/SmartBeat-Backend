import { Module } from '@nestjs/common';
import { HealthCenterServiceImpl } from '../index.application';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthCenter } from 'src/domain/index.domain';
import { HealthCenterController } from 'src/infrastructure/index.controller';


@Module({
  controllers: [HealthCenterController],
  providers: [HealthCenterServiceImpl],
  imports: [
    TypeOrmModule.forFeature([HealthCenter])
  ]
})
export class HealthCenterModule {}
