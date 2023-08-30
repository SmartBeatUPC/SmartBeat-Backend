import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { DiagnosticController } from "./controllers/diagnostic.controller";

@Module({
    imports: [
      ConfigModule.forRoot(),
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
      DiagnosticController
    ]
  })
  export class DiagnosticModule { }