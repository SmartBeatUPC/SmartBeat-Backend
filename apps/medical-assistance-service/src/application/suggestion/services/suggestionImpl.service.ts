import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSuggestionDto } from '../dto/create-suggestion.dto';
import { SuggestionResponse, UpdateSuggestionDto } from '../dto/update-suggestion.dto';
import { Suggestion, SuggestionService } from 'src/domain/index.domain';
import { InjectRepository } from '@nestjs/typeorm';
import OpenAI from 'openai';
import { Repository } from 'typeorm';
import { promptSuggestion, promptPathology } from 'src/application/prompts';
import { MedicalInformationClient } from 'src/shared/medical-information/medical-information.client';
import { PatientClient } from 'src/shared/patient/patient.client';


@Injectable()
export class SuggestionServiceImpl implements SuggestionService{
  constructor(@InjectRepository(Suggestion) private suggestionRepository: Repository<Suggestion>,
  private patientClient: PatientClient,
  private medicalInformationClient: MedicalInformationClient){}

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
      return {responseAssistance, totalTokens, success: true};
    } catch(error){
      return new SuggestionResponse(`An error ocurred when using GPT Suggestion: ` + error.message);
    }
  }

  async makeGPTSuggestionWithIds(methodology: boolean, patientId: number, informationId: number){
    try{
      const methodologyChoosed = methodology ? 'Guía: Europea' : 'Guía: Americana';
      let patientInfoText = '';
      const patientExist = await this.patientClient.findPatientById(patientId);
      if(!patientExist || !patientExist.success) return new SuggestionResponse(`Patient with id ${patientId} is not registered`)
      const medicalInformationExist = await this.medicalInformationClient.getCompleteMedicalInformationById(informationId);
      if(!medicalInformationExist || !medicalInformationExist.success) return new SuggestionResponse(medicalInformationExist.message);
      const {pathologies, success, medicalRecordId, ...medicalInformationData} = medicalInformationExist;
      for (const [key, value] of Object.entries(medicalInformationData)) {
        patientInfoText += `, ${key}: ${value}`;
      }
      let gptPrompt = promptSuggestion.toString() + methodologyChoosed.toString() + ', Edad: '+ patientExist.resource.age +', Genero: ' + patientExist.resource.gender  + ', Nacionalidad: ' + patientExist.resource.nationality + patientInfoText.toString();
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
        //model: "gpt-3.5-turbo",
        model: "gpt-4",
        messages: [
          {
            "role": "user",
            "content": gptPrompt
          }
        ],
      });

      let responseAssistance = response.choices[0].message.content;
      let totalTokens = response.usage.total_tokens;
      return {responseAssistance, totalTokens, success: true};
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
