import { Controller, UseFilters, Inject, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "src/api-gateway/util/http-exception.filter";
import { RequestSuggestionDto } from "../models/suggestion.dto";

@ApiTags('Suggestions')
@Controller('Suggestion')
@UseFilters(new HttpExceptionFilter())
export class SuggestionController {
  
    constructor(@Inject('MEDICAL_ASSISTANCE_SERVICE') private SuggestionService: ClientProxy) {}

    @Post()
    createSuggestion(@Body() createSuggestionDto: RequestSuggestionDto) {
        return this.SuggestionService.send({ cmd: 'createSuggestion' }, createSuggestionDto);
    }
  
    @Get()
    findAllSuggestions() {
        return this.SuggestionService.send({ cmd: 'findAllSuggestions' }, '');
    }
  
    @Get(':id')
    findOneSuggestion(@Param('id') id: number) {
        return this.SuggestionService.send({ cmd: 'findOneSuggestion' }, id);
    }
  
  
    @Patch(':id')
    updateSuggestion(@Param('id') id: number, @Body() updateSuggestionDto: RequestSuggestionDto) {
        return this.SuggestionService.send({ cmd: 'updateSuggestion' }, {id, updateSuggestionDto});
    }
  
    @Delete(':id')
    removeSuggestion(@Param('id') id: number) {
        return this.SuggestionService.send({ cmd: 'removeSuggestion' }, id);
    }
}