import { CreateHealthCenterDto, UpdateHealthCenterDto } from "src/application/index.application";

export interface HealthCenterService{
    create(createHealthCenterDto: CreateHealthCenterDto);
    findAll();
    findOne(id: number);
    update(id: number, updateHealthCenterDto: UpdateHealthCenterDto);
    remove(id: number);
}