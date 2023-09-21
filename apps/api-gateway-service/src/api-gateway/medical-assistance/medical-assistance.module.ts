import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { RecommendationController } from "./controllers/recommendation.controller";
import { SuggestionController } from "./controllers/suggestion.controller";

@Module({
    imports: [
      ConfigModule.forRoot(),
      ClientsModule.register([
        {
          name: 'MEDICAL_ASSISTANCE_SERVICE',
          transport: Transport.TCP,
          options: {
            host: process.env.MEDICAL_ASSISTANCE_SERVICE_HOSTNAME,
            port: +process.env.MEDICAL_ASSISTANCE_SERVICE_PORT,
          },
        },
      ]),
    ],
    controllers: [
      RecommendationController,
      SuggestionController
    ]
  })
  export class MedicalAssistanceModule { }