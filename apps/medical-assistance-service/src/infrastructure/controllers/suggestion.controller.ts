import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateSuggestionDto, SuggestionServiceImpl, UpdateSuggestionDto } from 'src/application/index.application';


@Controller()
export class SuggestionController {
  constructor(private readonly suggestionService: SuggestionServiceImpl) {}

  @MessagePattern({cmd: 'createSuggestion'})
  create(data: { recordId: number, createSuggestionDto: CreateSuggestionDto}) {
    const {recordId, createSuggestionDto} = data
    return this.suggestionService.create(recordId, createSuggestionDto);
  }

  @MessagePattern({cmd: 'findAllSuggestions'})
  findAll() {
    return this.suggestionService.findAll();
  }

  @MessagePattern({cmd: 'findOneSuggestion'})
  findOne(@Payload() id: number) {
    return this.suggestionService.findOne(id);
  }

  @MessagePattern({cmd: 'updateSuggestion'})
  update(data: {id: number, updateSuggestionDto: UpdateSuggestionDto}) {
    const {id, updateSuggestionDto} = data;
    return this.suggestionService.update(id, updateSuggestionDto);
  }

  @MessagePattern({cmd: 'generateGPTSuggestion'})
  assistanceGPT() {
    return this.suggestionService.startOpenAI();
  }

}
