import { CreateDiagnosticDto, UpdateDiagnosticDto } from "src/application/index.application";

export interface DiagnosticService{
    create(consultationId: number, createDiagnosticDto: CreateDiagnosticDto);
    findAll();
    findOne(id: number);
    findByMedicalConsultationId(consultationId: number);
    update(id: number, updateDiagnosticDto: UpdateDiagnosticDto);
}