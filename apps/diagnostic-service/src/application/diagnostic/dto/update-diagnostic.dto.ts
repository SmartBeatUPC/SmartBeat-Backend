import { PartialType } from '@nestjs/mapped-types';
import { CreateDiagnosticDto } from './create-diagnostic.dto';
import { BaseResponse } from 'src/utils/base.response';

export class UpdateDiagnosticDto extends PartialType(CreateDiagnosticDto) {}
export class DiagnosticResponse extends BaseResponse<UpdateDiagnosticDto>{}