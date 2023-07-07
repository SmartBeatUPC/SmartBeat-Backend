import { PartialType } from '@nestjs/swagger';
import { CreateApiGatewayDto } from './create-api-gateway.dto';

export class UpdateApiGatewayDto extends PartialType(CreateApiGatewayDto) {}
