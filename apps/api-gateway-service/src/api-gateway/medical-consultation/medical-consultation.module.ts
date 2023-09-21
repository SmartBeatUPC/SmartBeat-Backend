import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { MedicalConsultationController } from "./controllers/medical-consultation.controller";
import { MedicalRecordController } from "./controllers/medical-record.controller";

@Module({
    imports: [
      ConfigModule.forRoot(),
      ClientsModule.register([
        {
          name: 'MEDICAL_CONSULTATION_SERVICE',
          transport: Transport.TCP,
          options: {
            host: process.env.MEDICAL_CONSULTATION_SERVICE_HOSTNAME,
            port: +process.env.MEDICAL_CONSULTATION_SERVICE_PORT,
          },
        },
      ]),
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
      ClientsModule.register([
        {
          name: 'DIAGNOSTIC_SERVICE',
          transport: Transport.TCP,
          options: {
            host: process.env.DIAGNOSTIC_SERVICE_HOSTNAME,
            port: +process.env.DIAGNOSTIC_SERVICE_PORT,
          },
        },
      ]),
    ],
    controllers: [
      MedicalConsultationController, 
      MedicalRecordController
    ]
  })
  export class MedicalConsultationModule { }