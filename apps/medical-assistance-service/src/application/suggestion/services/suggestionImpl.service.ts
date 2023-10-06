import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSuggestionDto } from '../dto/create-suggestion.dto';
import { SuggestionResponse, UpdateSuggestionDto } from '../dto/update-suggestion.dto';
import { Suggestion, SuggestionService } from 'src/domain/index.domain';
import { InjectRepository } from '@nestjs/typeorm';
import OpenAI from 'openai';
import { Repository } from 'typeorm';
import { promptSuggestion, promptPathology } from 'src/application/prompts';


@Injectable()
export class SuggestionServiceImpl implements SuggestionService{
  constructor(@InjectRepository(Suggestion) private suggestionRepository: Repository<Suggestion>){}

  async startOpenAI(){
    try {
      const openai = await new OpenAI({
        apiKey: process.env.CHATGPT_KEY
      });
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            "role": "user",
            "content": "Hola, ChatGPT. Estoy probando las funcionalidades de tu API, si me comprendes responde con un <<Hola Mundo, soy ChatGPT y me encuentro en SmartBeat>> junto con un corto dato médico aleatorio de la hipertensión"
          }
        ],
        // max_tokens: 4000,
      });
      return response;
      } catch (error) {
        return new SuggestionResponse(`An error ocurred when using GPT Suggestion: ` + error.message);
      }
  }

  async makeGPTSuggestion(methodology: boolean, age: number, gender: string,patientPpg: any, patientInformation: any, pathologies?: string[]){
    try{
      const methodologyChoosed = methodology ? 'Guía: Europea' : 'Guía: Americana';
      let patientInfoText = '';
      for(const [key, value] of Object.entries(patientPpg)) {
        patientInfoText += `, ${key}: ${value}`;
      }
      for (const [key, value] of Object.entries(patientInformation)) {
        patientInfoText += `, ${key}: ${value}`;
      }
      let gptPrompt = promptSuggestion.toString() + methodologyChoosed.toString() + ', Edad: '+ age +', Genero: ' + gender + patientInfoText.toString();
      let pathologiesText = '';
      if (pathologies && pathologies.length != 0) {
        for (const pathology of pathologies) {
          pathologiesText += `, ${pathology}`;
        }
        pathologiesText = pathologiesText.slice(2);
        gptPrompt = gptPrompt  + promptPathology.toString()+pathologiesText.toString();
      }
      const openai = await new OpenAI({
        apiKey: process.env.CHATGPT_KEY
      });
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            "role": "user",
            "content": gptPrompt
          }
        ],
      });

      let responseAssistance = response.choices[0].message.content;
      let totalTokens = response.usage.total_tokens;
      return {responseAssistance, totalTokens};
    } catch(error){
      return new SuggestionResponse(`An error ocurred when using GPT Suggestion: ` + error.message);
    }
  }

  

  async create(recordId: number, createSuggestionDto: CreateSuggestionDto) {
    try{
      const newSuggestion = await this.suggestionRepository.save({
        ...createSuggestionDto,
        medicalRecordId: recordId
      })
      return new SuggestionResponse('', newSuggestion);
    }catch(error){
      return new SuggestionResponse(`An error ocurred when finding suggestion: ` + error.message);
    }
  }

  findAll() {
    return this.suggestionRepository.find();
  }

  async findOne(id: number) {
    try{
      const SuggestionExist =  await this.suggestionRepository.findOne({where: {id: id}});
      if (!SuggestionExist) return new SuggestionResponse(`Suggestion with id ${id} is not registered`);
      return new SuggestionResponse('',SuggestionExist);
    }catch(error){
      return new SuggestionResponse(`An error ocurred when finding suggestion: ` + error.message);
    }
  }

  async update(id: number, updateSuggestionDto: UpdateSuggestionDto) {
    const SuggestionExist =  await this.suggestionRepository.findOne({where: {id: id}});

    if (!SuggestionExist) throw new NotFoundException(`Suggestion with id ${id} is not registered`);
    const updatedSuggestion = Object.assign(SuggestionExist,updateSuggestionDto);

    const resp = await this.suggestionRepository.save(updatedSuggestion);
    return new SuggestionResponse('',resp);
  }

 
}
