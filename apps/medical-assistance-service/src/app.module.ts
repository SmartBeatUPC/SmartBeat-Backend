import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecommendationModule } from './recommendation/recommendation.module';
import { SuggestionModule } from './suggestion/suggestion.module';

@Module({
  imports: [RecommendationModule, SuggestionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
