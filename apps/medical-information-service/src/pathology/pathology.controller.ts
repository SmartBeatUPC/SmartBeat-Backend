import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PathologyService } from './pathology.service';
import { CreatePathologyDto } from './dto/create-pathology.dto';
import { UpdatePathologyDto } from './dto/update-pathology.dto';

@Controller()
export class PathologyController {
  constructor(private readonly pathologyService: PathologyService) {}

  @MessagePattern('createPathology')
  create(@Payload() createPathologyDto: CreatePathologyDto) {
    return this.pathologyService.create(createPathologyDto);
  }

  @MessagePattern('findAllPathology')
  findAll() {
    return this.pathologyService.findAll();
  }

  @MessagePattern('findOnePathology')
  findOne(@Payload() id: number) {
    return this.pathologyService.findOne(id);
  }

  @MessagePattern('updatePathology')
  update(@Payload() updatePathologyDto: UpdatePathologyDto) {
    return this.pathologyService.update(updatePathologyDto.id, updatePathologyDto);
  }

  @MessagePattern('removePathology')
  remove(@Payload() id: number) {
    return this.pathologyService.remove(id);
  }
}
