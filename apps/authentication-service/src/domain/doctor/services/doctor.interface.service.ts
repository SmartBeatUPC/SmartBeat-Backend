import { CreateDoctorDto, UpdateDoctorDto } from "src/application/index.application";

export interface DoctorService{
    create(createDoctorDto: CreateDoctorDto);
    findAll();
    findOne(id: number);
    findByUserId(userId: number);
    update(id: number, updateDoctorDto: UpdateDoctorDto);
    remove(id: number);
}