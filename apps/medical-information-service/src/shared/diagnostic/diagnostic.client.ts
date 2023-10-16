import { Injectable } from "@nestjs/common";
import { Client, Transport, ClientProxy } from "@nestjs/microservices";
import { lastValueFrom, map } from "rxjs";
import { config } from 'dotenv';

config();
@Injectable()
export class DiagnosticClient {

  @Client({
    transport: Transport.TCP,
    options: {
      host: process.env.DIAGNOSTIC_SERVICE_HOSTNAME,
      port: +process.env.DIAGNOSTIC_SERVICE_PORT, 
    },
  })
  private readonly clientProxy: ClientProxy;

  async findCompleteDiagnosticByMedicalRecordId(id:number){
    const response = await lastValueFrom(this.clientProxy.send({ cmd: 'findCompleteDiagnosticByMedicalRecordId' }, id)
      .pipe(
        map(response => response)
      ));

    return response;
  }
}