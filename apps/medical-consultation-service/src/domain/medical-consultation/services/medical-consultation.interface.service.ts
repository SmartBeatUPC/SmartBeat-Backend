import { CreateMedicalConsultationDto, UpdateMedicalConsultationDto } from "src/application/index.application";

export interface MedicalConsultationService{
    create(createMedicalConsultationDto: CreateMedicalConsultationDto);
    findAll();
    findOne(id: number);
    update(id: number, updateMedicalConsultationDto: UpdateMedicalConsultationDto);
    remove(id: number);
}