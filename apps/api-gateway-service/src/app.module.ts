import { Module } from '@nestjs/common';
import { ApiGatewayModule } from './api-gateway/api-gateway.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ApiGatewayModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
