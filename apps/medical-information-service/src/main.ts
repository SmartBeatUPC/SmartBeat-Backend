import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  //const app = await NestFactory.create(AppModule);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options:{
        host: process.env.HOSTNAME,
        port: +process.env.PORT
      }
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Aplicar la transformación automática a los DTOs
      whitelist: true, // Filtrar propiedades no decoradas
    }),
  );
  
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen()
  
}
bootstrap();