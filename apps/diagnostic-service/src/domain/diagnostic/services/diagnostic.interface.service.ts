import { CreateDiagnosticDto, UpdateDiagnosticDto } from "src/application/index.application";

export interface DiagnosticService{
    create(id: number, createDiagnosticDto: CreateDiagnosticDto);
    findAll();
    findOne(id: number);
    findByMedicalRecordId(id: number);
    update(id: number, updateDiagnosticDto: UpdateDiagnosticDto);
}