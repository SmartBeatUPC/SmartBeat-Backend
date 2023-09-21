import { CreateUserDto, UpdateUserDto } from "src/application/index.application";

export interface UserService{
    create(createUserDto: CreateUserDto);
    findAll();
    findOne(id: number);
    verifyUser(email: string, password: string);
    update(id: number, updateUserDto: UpdateUserDto);
    remove(id: number);
}