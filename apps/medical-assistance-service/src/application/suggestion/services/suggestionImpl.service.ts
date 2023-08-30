import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSuggestionDto } from '../dto/create-suggestion.dto';
import { SuggestionResponse, UpdateSuggestionDto } from '../dto/update-suggestion.dto';
import { Suggestion, SuggestionService } from 'src/domain/index.domain';
import { InjectRepository } from '@nestjs/typeorm';
import OpenAI from 'openai';
import { Repository } from 'typeorm';


@Injectable()
export class SuggestionServiceImpl implements SuggestionService{
  constructor(@InjectRepository(Suggestion) private suggestionRepository: Repository<Suggestion>){}

  async startOpenAI(){
    const openai = new OpenAI({
      apiKey: process.env.CHATGPT_KEY,
      organization: process.env.CHATGPT_ORGANIZATION_ID
    });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "assistant",
          "content": "Hola, ChatGPT. Estoy probando las funcionalidades de tu API, si me comprendes responde con un <<Hola Mundo, soy ChatGPT y me encuentro en SmartBeat>> junto con un corto dato médico aleatorio de la hipertensión"
        }
      ],
      temperature: 1,
      max_tokens: 4000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return response.choices[0].message.content;
  }

  

  create(createSuggestionDto: CreateSuggestionDto) {
    return 'This action adds a new Suggestion';
  }

  findAll() {
    return this.suggestionRepository.find();
  }

  async findOne(id: number) {
    try{
      const SuggestionExist =  await this.suggestionRepository.findOne({where: {id: id}});

      if (!SuggestionExist) {
      return new SuggestionResponse(`Student with id ${id} is not registered`);
      }
      return new SuggestionResponse('',SuggestionExist);
    }catch(error){
      return new SuggestionResponse(`An error ocurred when finding ` + error.message);
    }
  }

  async update(id: number, updateSuggestionDto: UpdateSuggestionDto) {
    const SuggestionExist =  await this.suggestionRepository.findOne({where: {id: id}});

    if (!SuggestionExist) throw new NotFoundException(`Suggestion with id ${id} is not registered`);
    const updatedSuggestion = Object.assign(SuggestionExist,updateSuggestionDto);

    const resp = await this.suggestionRepository.save(updatedSuggestion);
    return new SuggestionResponse('',resp);
  }

  remove(id: number) {
    return `This action removes a #${id} Suggestion`;
  }
}
