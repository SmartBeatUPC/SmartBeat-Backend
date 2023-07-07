import { PartialType } from '@nestjs/mapped-types';
import { CreatePpgDto } from './create-ppg.dto';

export class UpdatePpgDto extends PartialType(CreatePpgDto) {
  id: number;
}
