import { Module } from '@nestjs/common';
import { UserServiceImpl } from '../index.application';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor, Patient, User } from 'src/domain/index.domain';
import { UserController } from 'src/infrastructure/index.controller';


@Module({
  controllers: [UserController],
  providers: [UserServiceImpl],
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Patient]),
    TypeOrmModule.forFeature([Doctor])
  ]
})
export class UserModule {}
