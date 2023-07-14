import { CreateMedicalRecordDto, UpdateMedicalRecordDto } from "src/application/index.application";

export interface MedicalRecordService{
    create(createMedicalRecordDto: CreateMedicalRecordDto);
    findAll();
    findOne(id: number);
    update(id: number, updateMedicalRecordDto: UpdateMedicalRecordDto);
    remove(id: number);
}