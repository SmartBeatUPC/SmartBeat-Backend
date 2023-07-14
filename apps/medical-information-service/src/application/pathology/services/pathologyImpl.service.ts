import { Injectable } from '@nestjs/common';
import { PathologyService } from 'src/domain/index.domain';
import { CreatePathologyDto } from '../dto/create-pathology.dto';
import { UpdatePathologyDto } from '../dto/update-pathology.dto';

@Injectable()
export class PathologyServiceImpl implements PathologyService{
  create(createPathologyDto: CreatePathologyDto) {
    return 'This action adds a new pathology';
  }

  findAll() {
    return `This action returns all pathology`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pathology`;
  }

  update(id: number, updatePathologyDto: UpdatePathologyDto) {
    return `This action updates a #${id} pathology`;
  }

  remove(id: number) {
    return `This action removes a #${id} pathology`;
  }
}
