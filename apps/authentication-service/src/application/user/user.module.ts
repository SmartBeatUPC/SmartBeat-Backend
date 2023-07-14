import { Module } from '@nestjs/common';
import { UserServiceImpl } from '../index.application';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/index.domain';
import { UserController } from 'src/infrastructure/index.controller';


@Module({
  controllers: [UserController],
  providers: [UserServiceImpl],
  imports: [
    TypeOrmModule.forFeature([User])
  ]
})
export class UserModule {}
