import { Controller, UseFilters, Inject, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "src/api-gateway/util/http-exception.filter";
import { RequestPpgDto } from "../models/ppg.dto";

@ApiTags('Ppgs')
@Controller('Ppg')
@UseFilters(new HttpExceptionFilter())
export class PpgController {
  
    constructor(@Inject('MEDICAL_INFORMATION_SERVICE') private PpgService: ClientProxy) {}

    @Post()
    createPpg(@Body() createPpgDto: RequestPpgDto) {
        return this.PpgService.send({ cmd: 'createPpg' }, createPpgDto);
    }
  
    @Get()
    findAllPpgs() {
        return this.PpgService.send({ cmd: 'findAllPpgs' }, '');
    }
  
    @Get(':id')
    findOnePpg(@Param('id') id: number) {
        return this.PpgService.send({ cmd: 'findOnePpg' }, id);
    }
  
  
    @Patch(':id')
    updatePpg(@Param('id') id: number, @Body() updatePpgDto: RequestPpgDto) {
        return this.PpgService.send({ cmd: 'updatePpg' }, {id, updatePpgDto});
    }
  
    @Delete(':id')
    removePpg(@Param('id') id: number) {
        return this.PpgService.send({ cmd: 'removePpg' }, id);
    }
}