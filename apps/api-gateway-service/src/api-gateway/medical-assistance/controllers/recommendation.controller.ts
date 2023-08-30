import { Controller, UseFilters, Inject, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "src/api-gateway/util/http-exception.filter";
import { RequestRecommendationDto } from "../models/recommendation.dto";

@ApiTags('Recommendations')
@Controller('Recommendation')
@UseFilters(new HttpExceptionFilter())
export class RecommendationController {
  
    constructor(@Inject('MEDICAL_ASSISTANCE_SERVICE') private RecommendationService: ClientProxy) {}

    @Post()
    createRecommendation(@Body() createRecommendationDto: RequestRecommendationDto) {
        return this.RecommendationService.send({ cmd: 'createRecommendation' }, createRecommendationDto);
    }
  
    @Get()
    findAllRecommendations() {
        return this.RecommendationService.send({ cmd: 'findAllRecommendations' }, '');
    }
  
    @Get(':id')
    findOneRecommendation(@Param('id') id: number) {
        return this.RecommendationService.send({ cmd: 'findOneRecommendation' }, id);
    }
  
  
    @Patch(':id')
    updateRecommendation(@Param('id') id: number, @Body() updateRecommendationDto: RequestRecommendationDto) {
        return this.RecommendationService.send({ cmd: 'updateRecommendation' }, {id, updateRecommendationDto});
    }
  
    @Delete(':id')
    removeRecommendation(@Param('id') id: number) {
        return this.RecommendationService.send({ cmd: 'removeRecommendation' }, id);
    }
}