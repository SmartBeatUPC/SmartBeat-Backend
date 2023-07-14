import { CreateMedicalInformationDto, UpdateMedicalInformationDto } from "src/application/index.application";

export interface MedicalInformationService{
    create(createMedicalInformationDto: CreateMedicalInformationDto);
    findAll();
    findOne(id: number);
    update(id: number, updateMedicalInformationDto: UpdateMedicalInformationDto);
    remove(id: number);
}