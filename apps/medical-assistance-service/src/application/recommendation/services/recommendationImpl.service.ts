import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecommendationDto } from '../dto/create-recommendation.dto';
import { RecommendationResponse, UpdateRecommendationDto } from '../dto/update-recommendation.dto';
import { Recommendation, RecommendationService } from 'src/domain/index.domain';
import { OpenAI } from 'openai';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { promptPathology, promptRecommendation } from 'src/application/prompts';
import { MedicalInformationClient } from 'src/shared/medical-information/medical-information.client';
import { PatientClient } from 'src/shared/patient/patient.client';


@Injectable()
export class RecommendationServiceImpl implements RecommendationService{


  constructor(@InjectRepository(Recommendation) private recommendationRepository: Repository<Recommendation>,
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
      return new RecommendationResponse(`An error ocurred when using GPT Recommendation: ` + error.message);
    }
  }

  async makeGPTRecommendation(methodology: boolean, age: number, gender: string, patientPpg: any ,patientInformation: any, pathologies?: string[]){
    try{
      const methodologyChoosed = methodology ? 'Guía: Europea' : 'Guía: Americana';
      let patientInfoText = '';
      for(const [key, value] of Object.entries(patientPpg)) {
        patientInfoText += `, ${key}: ${value}`;
      }
      for (const [key, value] of Object.entries(patientInformation)) {
        patientInfoText += `, ${key}: ${value}`;
      }
      let gptPrompt = promptRecommendation.toString() + methodologyChoosed.toString()+ ', Edad: '+ age +', Genero: ' + gender  + patientInfoText.toString();
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
      return new RecommendationResponse(`An error ocurred when using GPT Recommendation: ` + error.message);
    }
  }

  async makeGPTRecommendationWithIds(methodology: boolean, patientId: number, informationId: number){
    try{
      const methodologyChoosed = methodology ? 'Guía: Europea' : 'Guía: Americana';
      let patientInfoText = '';
      const patientExist = await this.patientClient.findPatientById(patientId);
      if(!patientExist || !patientExist.success) return new RecommendationResponse(`Patient with id ${patientId} is not registered`)
      const medicalInformationExist = await this.medicalInformationClient.getCompleteMedicalInformationById(informationId);
      if(!medicalInformationExist || !medicalInformationExist.success) return new RecommendationResponse(medicalInformationExist.message);
      const {pathologies, success, medicalRecordId, ...medicalInformationData} = medicalInformationExist;
      for (const [key, value] of Object.entries(medicalInformationData)) {
        patientInfoText += `, ${key}: ${value}`;
      }
      let gptPrompt = promptRecommendation.toString() + methodologyChoosed.toString()+ ', Edad: '+ patientExist.resource.age +', Genero: ' + patientExist.resource.gender + ', Nacionalidad: ' + patientExist.resource.nationality  + patientInfoText.toString();
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
      return new RecommendationResponse(`An error ocurred when using GPT Recommendation: ` + error.message);
    }
  }
  

  async create(recordId: number, createRecommendationDto: CreateRecommendationDto) {
    try{
      const newRecommendation = await this.recommendationRepository.save({
        ...createRecommendationDto,
        medicalRecordId: recordId
      })
      return new RecommendationResponse('', newRecommendation);
    }catch(error){
      return new RecommendationResponse(`An error ocurred when finding Recommendation: ` + error.message);
    }
  }

  findAll() {
    return this.recommendationRepository.find();
  }

  async findOne(id: number) {
    try{
      const recommendationExist =  await this.recommendationRepository.findOne({where: {id: id}});

      if (!recommendationExist) {
      return new RecommendationResponse(`Recommendation with id ${id} is not registered`);
      }
      return new RecommendationResponse('',recommendationExist);
    }catch(error){
      return new RecommendationResponse(`An error ocurred when finding ` + error.message);
    }
  }

  async update(id: number, updateRecommendationDto: UpdateRecommendationDto) {
    const recommendationExist =  await this.recommendationRepository.findOne({where: {id: id}});

    if (!recommendationExist) throw new NotFoundException(`Recommendation with id ${id} is not registered`);
    const updatedRecommendation = Object.assign(recommendationExist,updateRecommendationDto);

    const resp = await this.recommendationRepository.save(updatedRecommendation);
    return new RecommendationResponse('',resp);
  }

  remove(id: number) {
    return `This action removes a #${id} recommendation`;
  }
}
