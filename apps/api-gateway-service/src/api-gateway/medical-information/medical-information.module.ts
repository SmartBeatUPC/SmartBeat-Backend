import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { MedicalInformationController } from "./controllers/medical-information.controller";
import { PpgController } from "./controllers/ppg.controller";
import { PathologyController } from "./controllers/pathology.controller";

@Module({
    imports: [
      ConfigModule.forRoot(),
      ClientsModule.register([
        {
          name: 'MEDICAL_INFORMATION_SERVICE',
          transport: Transport.TCP,
          options: {
            host: process.env.MEDICAL_INFORMATION_SERVICE_HOSTNAME,
            port: +process.env.MEDICAL_INFORMATION_SERVICE_PORT,
          },
        },
      ]),
    ],
    controllers: [
      MedicalInformationController,
      PpgController,
      PathologyController
    ]
  })
  export class MedicalInformationModule { }