import { CreateMedicalRecordDto, UpdateMedicalRecordDto } from "src/application/index.application";

export interface MedicalRecordService{
    findAll();
    findOne(id: number);
    findByIdAndMedicalConsultationId(consultationId: number, id:number);
    findAllMedicalRecordsByMedicalConsultationId(consultationId: number);
}