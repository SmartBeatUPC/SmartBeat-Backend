import { CreateDiagnosticDto, UpdateDiagnosticDto } from "src/application/index.application";

export interface DiagnosticService{
    create(createDiagnosticDto: CreateDiagnosticDto);
    findAll();
    findOne(id: number);
    update(id: number, updateDiagnosticDto: UpdateDiagnosticDto);
    remove(id: number);
}