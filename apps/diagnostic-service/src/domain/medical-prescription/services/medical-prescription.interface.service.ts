import { CreateMedicalPrescriptionDto, UpdateMedicalPrescriptionDto } from "src/application/index.application";

export interface MedicalPrescriptionService{
    create(createMedicalPrescriptionDto: CreateMedicalPrescriptionDto);
    findAll();
    findOne(id: number);
    update(id: number, updateMedicalPrescriptionDto: UpdateMedicalPrescriptionDto);
    remove(id: number);
}