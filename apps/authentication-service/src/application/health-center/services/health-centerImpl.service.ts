import { Injectable } from '@nestjs/common';
import { CreateHealthCenterDto } from '../dto/create-health-center.dto';
import { UpdateHealthCenterDto } from '../dto/update-health-center.dto';
import { HealthCenterService } from 'src/domain/health-center/services/health-center.interface.service';

@Injectable()
export class HealthCenterServiceImpl implements HealthCenterService {
  create(createHealthCenterDto: CreateHealthCenterDto) {
    return 'This action adds a new healthCenter';
  }

  findAll() {
    return `This action returns all healthCenter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} healthCenter`;
  }

  update(id: number, updateHealthCenterDto: UpdateHealthCenterDto) {
    return `This action updates a #${id} healthCenter`;
  }

  remove(id: number) {
    return `This action removes a #${id} healthCenter`;
  }
}
