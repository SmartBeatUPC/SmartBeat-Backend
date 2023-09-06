import { Controller, UseFilters, Inject, Post, Body, Get, Param, Patch, Delete, ParseIntPipe } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "src/api-gateway/util/http-exception.filter";
import { RequestSuggestionDto } from "../models/suggestion.dto";

@ApiTags('suggestions')
@Controller('suggestion')
@UseFilters(new HttpExceptionFilter())
export class SuggestionController {
  
    constructor(@Inject('MEDICAL_ASSISTANCE_SERVICE') private medicalAssistanceService: ClientProxy) {}
  
    @Get()
    findAllSuggestions() {
        return this.medicalAssistanceService.send({ cmd: 'findAllSuggestions' }, '');
    }
  
    @Get(':id')
    findOneSuggestion(@Param('id', ParseIntPipe) id: number) {
        return this.medicalAssistanceService.send({ cmd: 'findOneSuggestion' }, id);
    }
  
  
    @Patch(':id')
    updateSuggestion(@Param('id', ParseIntPipe) id: number, @Body() updateSuggestionDto: RequestSuggestionDto) {
        return this.medicalAssistanceService.send({ cmd: 'updateSuggestion' }, {id, updateSuggestionDto});
    }

    @Post('/GPT')
    generateGPTSuggestion() {
        return this.medicalAssistanceService.send({ cmd: 'generateGPTSuggestion' }, '');
    }
}