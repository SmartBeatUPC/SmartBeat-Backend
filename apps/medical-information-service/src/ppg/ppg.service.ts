import { Injectable } from '@nestjs/common';
import { CreatePpgDto } from './dto/create-ppg.dto';
import { UpdatePpgDto } from './dto/update-ppg.dto';

@Injectable()
export class PpgService {
  create(createPpgDto: CreatePpgDto) {
    return 'This action adds a new ppg';
  }

  findAll() {
    return `This action returns all ppg`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ppg`;
  }

  update(id: number, updatePpgDto: UpdatePpgDto) {
    return `This action updates a #${id} ppg`;
  }

  remove(id: number) {
    return `This action removes a #${id} ppg`;
  }
}
