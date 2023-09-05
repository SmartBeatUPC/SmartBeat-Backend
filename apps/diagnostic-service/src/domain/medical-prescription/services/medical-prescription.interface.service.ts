import { CreateMedicalPrescriptionDto, UpdateMedicalPrescriptionDto } from "src/application/index.application";

export interface MedicalPrescriptionService{
    create(diagnosticId: number, createMedicalPrescriptionDto: CreateMedicalPrescriptionDto);
    findAll();
    findOne(id: number);
    update(id: number, updateMedicalPrescriptionDto: UpdateMedicalPrescriptionDto);
    findByDiagnosticId(diagnosticId: number);
}