import { CreateDoctorCenterDto, UpdateDoctorCenterDto } from "src/application/index.application";

export interface DoctorCenterService{
    create(createDoctorCenterDto: CreateDoctorCenterDto);
    findAll();
    findOne(id: number);
    findByIdAndDoctorId(doctorId: number, id: number);
    findAllByDoctorId(doctorId:number);
    findByIdAndHealthCenterId(centerId: number, id: number);
    findAllByHealthCenterId(centerId: number);
    update(id: number, updateDoctorCenterDto: UpdateDoctorCenterDto);
    remove(id: number);
}