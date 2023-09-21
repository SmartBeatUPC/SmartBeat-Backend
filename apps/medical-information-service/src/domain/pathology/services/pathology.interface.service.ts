import { CreatePathologyDto, UpdatePathologyDto } from "src/application/index.application";

export interface PathologyService{
    create(informationId: number, createPathologyDto: CreatePathologyDto);
    findAll();
    findPathologyByMedicalInformationId(informationId);
    update(id: number, updatePathologyDto: UpdatePathologyDto);
}