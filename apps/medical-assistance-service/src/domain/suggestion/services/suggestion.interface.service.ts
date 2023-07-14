import { CreateSuggestionDto, UpdateSuggestionDto } from "src/application/index.application";

export interface SuggestionService{
    create(createSuggestionDto: CreateSuggestionDto);
    findAll();
    findOne(id: number);
    update(id: number, updateSuggestionDto: UpdateSuggestionDto);
    remove(id: number);
}