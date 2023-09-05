import { Controller, UseFilters, Inject, Post, Body, Get, Param, Patch, Delete, ParseIntPipe } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "src/api-gateway/util/http-exception.filter";
import { RequestRecommendationDto } from "../models/recommendation.dto";

@ApiTags('recommendations')
@Controller('recommendation')
@UseFilters(new HttpExceptionFilter())
export class RecommendationController {
  
    constructor(@Inject('MEDICAL_ASSISTANCE_SERVICE') private medicalAssistanceService: ClientProxy) {}

    @Get()
    findAllRecommendations() {
        return this.medicalAssistanceService.send({ cmd: 'findAllRecommendations' }, '');
    }
  
    @Get(':id')
    findOneRecommendation(@Param('id', ParseIntPipe) id: number) {
        return this.medicalAssistanceService.send({ cmd: 'findOneRecommendation' }, id);
    }
  
  
    @Patch(':id')
    updateRecommendation(@Param('id', ParseIntPipe) id: number, @Body() updateRecommendationDto: RequestRecommendationDto) {
        return this.medicalAssistanceService.send({ cmd: 'updateRecommendation' }, {id, updateRecommendationDto});
    }
  
    @Get('/GPT')
    generateGPTRecommendation() {
        return this.medicalAssistanceService.send({ cmd: 'generateGPTRecommendation' }, '');
    }
}