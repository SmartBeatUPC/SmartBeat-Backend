import { Module } from '@nestjs/common';
import { SuggestionServiceImpl } from './services/suggestionImpl.service';
import { SuggestionController } from 'src/infrastructure/index.controller';
import { Suggestion } from 'src/domain/index.domain';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  controllers: [SuggestionController],
  providers: [SuggestionServiceImpl],
  imports:[
    TypeOrmModule.forFeature([Suggestion])
  ]
})
export class SuggestionModule {}
