import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserServiceImpl, CreateUserDto, UpdateUserDto } from 'src/application/index.application';


@Controller()
export class UserController {
  constructor(private readonly userService: UserServiceImpl) {}

  @MessagePattern({cmd: 'createUser'})
  create(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @MessagePattern({cmd: 'findAllUsers'})
  findAll() {
    return this.userService.findAll();
  }

  @MessagePattern({cmd: 'findOneUser'})
  findOne(id: number) {
    return this.userService.findOne(id);
  }

  @MessagePattern({cmd: 'verifyUser'})
  verifyUser(data: {email: string, password: string}) {
    const {email, password} = data
    return this.userService.verifyUser(email, password);
  }

  @MessagePattern({cmd: 'updateUser'})
  update(data: {id: number, updateUserDto: UpdateUserDto}) {
    const {id, updateUserDto} = data
    return this.userService.update(id, updateUserDto);
  }

  @MessagePattern({cmd: 'removeUser'})
  remove(id: number) {
    return this.userService.remove(id);
  }
}
