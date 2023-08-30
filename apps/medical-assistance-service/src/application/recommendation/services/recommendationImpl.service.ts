import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecommendationDto } from '../dto/create-recommendation.dto';
import { RecommendationResponse, UpdateRecommendationDto } from '../dto/update-recommendation.dto';
import { Recommendation, RecommendationService } from 'src/domain/index.domain';
import { OpenAI } from 'openai';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class RecommendationServiceImpl implements RecommendationService{


  constructor(@InjectRepository(Recommendation) private recommendationRepository: Repository<Recommendation>){}

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
  

  create(createRecommendationDto: CreateRecommendationDto) {
    return 'This action adds a new recommendation';
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
