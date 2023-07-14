import { CreateUserDto, UpdateUserDto } from "src/application/index.application";

export interface UserService{
    create(createUserDto: CreateUserDto);
    findAll();
    findOne(id: number);
    update(id: number, updateUserDto: UpdateUserDto);
    remove(id: number);
}