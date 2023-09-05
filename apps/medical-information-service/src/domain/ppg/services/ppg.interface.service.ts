import { CreatePpgDto, UpdatePpgDto } from "src/application/index.application";

export interface PpgService{
    create(informationId: number, createPpgDto: CreatePpgDto);
    findPPGByInformationId(informationId: number);
    update(id: number, updatePpgDto: UpdatePpgDto);
}