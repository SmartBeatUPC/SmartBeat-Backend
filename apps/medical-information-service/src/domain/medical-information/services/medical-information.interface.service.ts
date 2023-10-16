import { CreateMedicalInformationDto, CreatePpgDto, UpdateMedicalInformationDto } from "src/application/index.application";

export interface MedicalInformationService{
    createMedicalRecordAndMedicalInformation(consultationId: number, createMedicalRecord: any,createMedicalInformationDto: CreateMedicalInformationDto, createPpgDto: CreatePpgDto);
    create(recordId: number, createMedicalInformation: CreateMedicalInformationDto);
    findAll();
    findOne(id: number);
    update(id: number, updateMedicalInformationDto: UpdateMedicalInformationDto);
    calculateBMI(altura: number, peso: number);
}