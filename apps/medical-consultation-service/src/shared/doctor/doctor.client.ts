import { Injectable } from "@nestjs/common";
import { Client, Transport, ClientProxy } from "@nestjs/microservices";
import { lastValueFrom, map } from "rxjs";
import { config } from 'dotenv';


config();
@Injectable()
export class DoctorClient {

  @Client({
    transport: Transport.TCP,
    options: {
      host: process.env.AUTHENTICATION_SERVICE_HOSTNAME,
      port: +process.env.AUTHENTICATION_SERVICE_PORT, 
    },
  })
  private readonly clientProxy: ClientProxy;

  async findDoctorById(id: number){

    const response = await lastValueFrom(this.clientProxy.send({ cmd: 'findOneDoctor' }, id)
      .pipe(
        map(response => response)
      ));

    return response;
  }
}