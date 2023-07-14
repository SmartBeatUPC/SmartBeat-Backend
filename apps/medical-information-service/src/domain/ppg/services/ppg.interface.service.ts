import { CreatePpgDto, UpdatePpgDto } from "src/application/index.application";

export interface PpgService{
    create(createPpgDto: CreatePpgDto);
    findAll();
    findOne(id: number);
    update(id: number, updatePpgDto: UpdatePpgDto);
    remove(id: number);
}