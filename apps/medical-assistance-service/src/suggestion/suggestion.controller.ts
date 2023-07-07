import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SuggestionService } from './suggestion.service';
import { CreateSuggestionDto } from './dto/create-suggestion.dto';
import { UpdateSuggestionDto } from './dto/update-suggestion.dto';

@Controller()
export class SuggestionController {
  constructor(private readonly suggestionService: SuggestionService) {}

  @MessagePattern('createSuggestion')
  create(@Payload() createSuggestionDto: CreateSuggestionDto) {
    return this.suggestionService.create(createSuggestionDto);
  }

  @MessagePattern('findAllSuggestion')
  findAll() {
    return this.suggestionService.findAll();
  }

  @MessagePattern('findOneSuggestion')
  findOne(@Payload() id: number) {
    return this.suggestionService.findOne(id);
  }

  @MessagePattern('updateSuggestion')
  update(@Payload() updateSuggestionDto: UpdateSuggestionDto) {
    return this.suggestionService.update(updateSuggestionDto.id, updateSuggestionDto);
  }

  @MessagePattern('removeSuggestion')
  remove(@Payload() id: number) {
    return this.suggestionService.remove(id);
  }
}
