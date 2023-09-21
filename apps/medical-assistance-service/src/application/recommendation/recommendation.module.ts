import { Module } from '@nestjs/common';
import { RecommendationServiceImpl } from './services/recommendationImpl.service';
import { RecommendationController } from 'src/infrastructure/index.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recommendation } from 'src/domain/index.domain';

@Module({
  controllers: [RecommendationController],
  providers: [RecommendationServiceImpl],
  imports:[
    TypeOrmModule.forFeature([Recommendation])
  ]
})
export class RecommendationModule {}
