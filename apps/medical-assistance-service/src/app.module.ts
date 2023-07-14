import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { RecommendationModule } from './application/recommendation/recommendation.module';
import { SuggestionModule } from './application/suggestion/suggestion.module';

@Module({
  imports: [ConfigModule.forRoot(), RecommendationModule, SuggestionModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
