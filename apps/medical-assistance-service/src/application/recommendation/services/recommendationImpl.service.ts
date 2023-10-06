import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecommendationDto } from '../dto/create-recommendation.dto';
import { RecommendationResponse, UpdateRecommendationDto } from '../dto/update-recommendation.dto';
import { Recommendation, RecommendationService } from 'src/domain/index.domain';
import { OpenAI } from 'openai';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { promptPathology, promptRecommendation } from 'src/application/prompts';


@Injectable()
export class RecommendationServiceImpl implements RecommendationService{


  constructor(@InjectRepository(Recommendation) private recommendationRepository: Repository<Recommendation>){}

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
      return {responseAssistance, totalTokens};
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
