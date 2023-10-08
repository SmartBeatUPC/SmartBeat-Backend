import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateSuggestionDto, SuggestionServiceImpl, UpdateSuggestionDto } from 'src/application/index.application';


@Controller()
export class SuggestionController {
  constructor(private readonly suggestionService: SuggestionServiceImpl) {}

  @MessagePattern({cmd: 'createSuggestion'})
  create(data: { id: number, createSuggestionDto: CreateSuggestionDto}) {
    const {id, createSuggestionDto} = data
    return this.suggestionService.create(id, createSuggestionDto);
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

  @MessagePattern({cmd: 'makeGPTSuggestion'})
  makeGPTSuggestion(data: {methodology: boolean, age: number, gender: string, ppg: any, medicalInformation: any, pathologies: string[]}) {
    const {methodology, age, gender, ppg,medicalInformation, pathologies} = data
    return this.suggestionService.makeGPTSuggestion(methodology, age, gender, ppg, medicalInformation, pathologies);
  }

  @MessagePattern({cmd: 'makeGPTSuggestionWithIds'})
  makeGPTSuggestionWithIds(data: {methodology: boolean, patientId: number, medicalInformationId: number}) {
    const {methodology, patientId, medicalInformationId} = data
    return this.suggestionService.makeGPTSuggestionWithIds(methodology, patientId, medicalInformationId);
  }

}
