import { CreatePatientDto, UpdatePatientDto } from "src/application/index.application";

export interface PatientService{
    create(createPatientDto: CreatePatientDto);
    findAll();
    findOne(id: number);
    update(id: number, updatePatientDto: UpdatePatientDto);
    remove(id: number);
}