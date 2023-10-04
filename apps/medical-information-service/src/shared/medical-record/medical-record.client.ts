import { Injectable } from "@nestjs/common";
import { Client, Transport, ClientProxy } from "@nestjs/microservices";
import { lastValueFrom, map } from "rxjs";
import { CreateMedicalRecordDto} from "./medical-record.response";
import { config } from 'dotenv';


config();
@Injectable()
export class MedicalRecordClient {

  @Client({
    transport: Transport.TCP,
    options: {
      host: process.env.MEDICAL_CONSULTATION_SERVICE_HOSTNAME,
      port: +process.env.MEDICAL_CONSULTATION_SERVICE_PORT, 
    },
  })
  private readonly clientProxy: ClientProxy;

  async createMedicalRecord(consultationId: number,createMedicalRecordDto: CreateMedicalRecordDto){

    const response = await lastValueFrom(this.clientProxy.send({ cmd: 'createMedicalRecord' }, {consultationId,createMedicalRecordDto})
      .pipe(
        map(response => response)
      ));

    return response;
  }

  async findAllMedicalRecordsByMedicalConsultationId(consultationId:number){
    const response = await lastValueFrom(this.clientProxy.send({ cmd: 'findAllMedicalRecordsByMedicalConsultationId' }, consultationId)
      .pipe(
        map(response => response)
      ));

    return response;
  }
}