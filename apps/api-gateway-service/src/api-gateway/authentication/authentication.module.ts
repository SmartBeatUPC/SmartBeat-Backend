import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { UserController } from "./controllers/user.controller";
import { DoctorCenterController } from "./controllers/doctor-center.controller";
import { DoctorController } from "./controllers/doctor.controller";
import { HealthCenterController } from "./controllers/health-center.controller";
import { PatientController } from "./controllers/patient.controller";


@Module({
    imports: [
      ConfigModule.forRoot(),
      ClientsModule.register([
        {
          name: 'AUTHENTICATION_SERVICE',
          transport: Transport.TCP,
          options: {
            host: process.env.AUTHENTICATION_SERVICE_HOSTNAME,
            port: +process.env.AUTHENTICATION_SERVICE_PORT,
          },
        },
      ]),
    ],
    controllers: [
      UserController,
      DoctorController,
      PatientController,
      DoctorCenterController,
      HealthCenterController
    ]
  })
  export class AuthenticationModule { }