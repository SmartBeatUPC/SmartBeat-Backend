import { CreateDoctorCenterDto, UpdateDoctorCenterDto } from "src/application/index.application";

export interface DoctorCenterService{
    create(createDoctorCenterDto: CreateDoctorCenterDto);
    findAll();
    findOne(id: number);
    update(id: number, updateDoctorCenterDto: UpdateDoctorCenterDto);
    remove(id: number);
}