import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PpgService } from './ppg.service';
import { CreatePpgDto } from './dto/create-ppg.dto';
import { UpdatePpgDto } from './dto/update-ppg.dto';

@Controller()
export class PpgController {
  constructor(private readonly ppgService: PpgService) {}

  @MessagePattern('createPpg')
  create(@Payload() createPpgDto: CreatePpgDto) {
    return this.ppgService.create(createPpgDto);
  }

  @MessagePattern('findAllPpg')
  findAll() {
    return this.ppgService.findAll();
  }

  @MessagePattern('findOnePpg')
  findOne(@Payload() id: number) {
    return this.ppgService.findOne(id);
  }

  @MessagePattern('updatePpg')
  update(@Payload() updatePpgDto: UpdatePpgDto) {
    return this.ppgService.update(updatePpgDto.id, updatePpgDto);
  }

  @MessagePattern('removePpg')
  remove(@Payload() id: number) {
    return this.ppgService.remove(id);
  }
}
