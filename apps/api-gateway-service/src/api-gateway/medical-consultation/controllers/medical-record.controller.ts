import { Controller, UseFilters, Inject, Post, Body, Get, Param, Patch, Delete, ParseIntPipe } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "src/api-gateway/util/http-exception.filter";
import { RequestRecommendationDto } from "src/api-gateway/medical-assistance/models/recommendation.dto";
import { RequestSuggestionDto } from "src/api-gateway/medical-assistance/models/suggestion.dto";
import { RequestMedicalInformationDto } from "src/api-gateway/medical-information/models/medical-information.dto";
import { RequestDiagnosticDto } from "src/api-gateway/diagnostic/models/diagnostic.dto";

@ApiTags('medical records')
@Controller('medical-record')
@UseFilters(new HttpExceptionFilter())
export class MedicalRecordController {
  
    constructor(@Inject('MEDICAL_CONSULTATION_SERVICE') private medicalConsultationService: ClientProxy,
    @Inject('MEDICAL_ASSISTANCE_SERVICE') private medicalAssistanceService: ClientProxy,
    @Inject('DIAGNOSTIC_SERVICE') private diagnosticService: ClientProxy,
    @Inject('MEDICAL_INFORMATION_SERVICE') private medicalInformationService: ClientProxy) {}

  
    @Get()
    findAllMedicalRecords() {
        return this.medicalConsultationService.send({ cmd: 'findAllMedicalRecords' }, '');
    }
  
    @Get(':id')
    findOneMedicalRecord(@Param('id') id: number) {
        return this.medicalConsultationService.send({ cmd: 'findOneMedicalRecord' }, id);
    }


    //Medical Assistance
    @Post(':id/recommendation')
    createRecommendation(@Param('id', ParseIntPipe) id: number, @Body() createRecommendationDto: RequestRecommendationDto) {
        return this.medicalAssistanceService.send({ cmd: 'createRecommendation' }, {id, createRecommendationDto});
    }

    @Post(':id/suggestion')
    createSuggestion(@Param('id', ParseIntPipe) id: number, @Body() createSuggestionDto: RequestSuggestionDto) {
        return this.medicalAssistanceService.send({ cmd: 'createSuggestion' },{id, createSuggestionDto});
    }

    //Medical Information
    @Post(':id/medical-information')
    createMedicalInformation(@Param('id', ParseIntPipe) id: number, @Body() createMedicalInformationDto: RequestMedicalInformationDto) {
        return this.medicalInformationService.send({ cmd: 'createMedicalInformation' },{id, createMedicalInformationDto});
    }

      //Diagnostic
      @Post(':id/diagnostic')
      createDiagnostic(@Param('id', ParseIntPipe)id: number, @Body() createDiagnosticDto: RequestDiagnosticDto) {
          return this.diagnosticService.send({ cmd: 'createDiagnostic' }, {id,createDiagnosticDto});
      }
    
}