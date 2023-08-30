import { Controller, UseFilters, Inject, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "src/api-gateway/util/http-exception.filter";
import { RequestUserDto } from "../models/user.dto";

@ApiTags('Users')
@Controller('User')
@UseFilters(new HttpExceptionFilter())
export class UserController {
  
    constructor(@Inject('AUTHENTICATION_SERVICE') private UserService: ClientProxy) {}

    @Post()
    createUser(@Body() createUserDto: RequestUserDto) {
        return this.UserService.send({ cmd: 'createUser' }, createUserDto);
    }
  
    @Get()
    findAllUsers() {
        return this.UserService.send({ cmd: 'findAllUsers' }, '');
    }
  
    @Get(':id')
    findOneUser(@Param('id') id: number) {
        return this.UserService.send({ cmd: 'findOneUser' }, id);
    }
  
  
    @Patch(':id')
    updateUser(@Param('id') id: number, @Body() updateUserDto: RequestUserDto) {
        return this.UserService.send({ cmd: 'updateUser' }, {id, updateUserDto});
    }
  
    @Delete(':id')
    removeUser(@Param('id') id: number) {
        return this.UserService.send({ cmd: 'removeUser' }, id);
    }
}