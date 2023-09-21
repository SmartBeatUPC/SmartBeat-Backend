import { CreateMedicalInformationDto, UpdateMedicalInformationDto } from "src/application/index.application";

export interface MedicalInformationService{
    create(recordId: number, createMedicalInformationDto: CreateMedicalInformationDto);
    findAll();
    findOne(id: number);
    update(id: number, updateMedicalInformationDto: UpdateMedicalInformationDto);
    calculateBMI(altura: number, peso: number);
}