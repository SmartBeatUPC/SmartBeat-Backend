import { Controller, UseFilters, Inject, Post, Body, Get, Param, Patch, Delete, ParseIntPipe } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { HttpExceptionFilter } from "src/api-gateway/util/http-exception.filter";
import { RequestUserDto, RequestVerifyUserDto } from "../models/user.dto";

@ApiTags('users')
@Controller('user')
@UseFilters(new HttpExceptionFilter())
export class UserController {
  
    constructor(@Inject('AUTHENTICATION_SERVICE') private authenticationService: ClientProxy) {}

    @Post()
    createUser(@Body() createUserDto: RequestUserDto) {
        return this.authenticationService.send({ cmd: 'createUser' }, createUserDto);
    }
  
    @Get()
    findAllUsers() {
        return this.authenticationService.send({ cmd: 'findAllUsers' }, '');
    }
  
    @Get(':id')
    findOneUser(@Param('id', ParseIntPipe) id: number) {
        return this.authenticationService.send({ cmd: 'findOneUser' }, id);
    }
  
    @Post('/verifyUser')
    verifyUser(@Body() verifyUser: RequestVerifyUserDto) {
        return this.authenticationService.send({ cmd: 'verifyUser' }, verifyUser);
    }
  
    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: RequestUserDto) {
        return this.authenticationService.send({ cmd: 'updateUser' }, {id, updateUserDto});
    }
  
    @Delete(':id')
    removeUser(@Param('id', ParseIntPipe) id: number) {
        return this.authenticationService.send({ cmd: 'removeUser' }, id);
    }

    @Get(':id/patient')
    findOnePatientByUserId(@Param('id', ParseIntPipe) id: number) {
        return this.authenticationService.send({ cmd: 'findOnePatientByUserId' }, id);
    }

    @Get(':id/doctor')
    findOneDoctorByUserId(@Param('id', ParseIntPipe) id: number) {
        return this.authenticationService.send({ cmd: 'findOneDoctorByUserId' }, id);
    }
}