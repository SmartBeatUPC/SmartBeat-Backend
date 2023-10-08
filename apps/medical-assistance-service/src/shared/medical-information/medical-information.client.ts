import { Injectable } from "@nestjs/common";
import { Client, Transport, ClientProxy } from "@nestjs/microservices";
import { lastValueFrom, map } from "rxjs";
import { config } from 'dotenv';


config();
@Injectable()
export class MedicalInformationClient {

  @Client({
    transport: Transport.TCP,
    options: {
      host: process.env.MEDICAL_INFORMATION_SERVICE_HOSTNAME,
      port: +process.env.MEDICAL_INFORMATION_SERVICE_PORT, 
    },
  })
  private readonly clientProxy: ClientProxy;

  async getCompleteMedicalInformationById(id: number){
    const response = await lastValueFrom(this.clientProxy.send({ cmd: 'getCompleteMedicalInformationById' }, id)
      .pipe(
        map(response => response)
      ));

    return response;
  }
}