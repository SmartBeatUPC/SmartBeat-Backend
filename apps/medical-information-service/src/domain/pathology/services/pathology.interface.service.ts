import { CreatePathologyDto, UpdatePathologyDto } from "src/application/index.application";

export interface PathologyService{
    create(createPathologyDto: CreatePathologyDto);
    findAll();
    findOne(id: number);
    update(id: number, updatePathologyDto: UpdatePathologyDto);
    remove(id: number);
}