import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto, UserResponse } from '../dto/update-user.dto';
import { UserService } from 'src/domain/user/services/user.interface.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor, Patient, User } from 'src/domain/index.domain';
import { Repository } from 'typeorm';
import { compare, hash, genSalt} from 'bcrypt';

@Injectable()
export class UserServiceImpl implements UserService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>,
  @InjectRepository(Patient) private patientRepository: Repository<Patient>,
  @InjectRepository(Doctor) private doctorRepository: Repository<Doctor>){}

  async create(createUserDto: CreateUserDto){
    try{
    const UserExist =  await this.userRepository.findOne({where: {email: createUserDto.email}});
    if (UserExist) {
      return new UserResponse(`User with email ${createUserDto.email} is registered`);
    }
    const salt = await genSalt(+process.env.SALT)
    createUserDto.password = await hash(createUserDto.password, salt);

    const newUser = await this.userRepository.save({
      enable: true,
      ...createUserDto
    });
    return new UserResponse('',newUser);
    }
    catch (error){
      return new UserResponse(`An error ocurred when saving user: ` + error.message);
    }
  }

  async registerUser(createUserDto: CreateUserDto, userIsDoctor: boolean,  personalData: any){
    try{
      const UserExist =  await this.userRepository.findOne({where: {email: createUserDto.email}});
      if (UserExist) return new UserResponse(`User with email ${createUserDto.email} is registered`);
      const salt = await genSalt(+process.env.SALT)
      createUserDto.password = await hash(createUserDto.password, salt);
  
      const newUser = await this.userRepository.save({
        enable: true,
        isDoctor: userIsDoctor,
        ...createUserDto
      });
      if(!newUser) return new UserResponse(`There was a problem creating your User`);

      if(newUser.isDoctor){ 
        //Es un Doctor
        const newDoctor = await this.doctorRepository.save({
          userId: newUser.id,
          ...personalData
        })
        return new UserResponse('', newDoctor);
      } else {
        //Es un Paciente
        const newPatient = await this.patientRepository.save({
          userId: newUser.id,
          ...personalData
        })
        return new UserResponse('', newPatient);
       }

      }
      catch (error){
        return new UserResponse(`An error ocurred when saving user: ` + error.message);
      }
    

  }

  async verifyUser(email: string, password: string){
    try{
    const UserExist =  await this.userRepository.findOneBy({email: email});
    if (!UserExist) {
      return new UserResponse(`User with email ${email} is not registered`);
      }
    const verifiedPassword = await this.comparePassword(password, UserExist.password);
    if (!verifiedPassword) {
      return new UserResponse(`Password is incorrect`);
    }

    let dataUser:any = null;
    let emailUser = UserExist.email;
    let isDoctor = UserExist.isDoctor;
    if(isDoctor){
      dataUser = await this.doctorRepository.findOneBy({userId: UserExist.id})
    }else{
      dataUser = await this.patientRepository.findOneBy({userId: UserExist.id})
    }
    if(dataUser == null) return new UserResponse(`User doesn't have a role`);

    return {dataUser, emailUser, isDoctor, success: true};
    }
    catch (error){
      return new UserResponse(`An error ocurred when finding ` + error.message);
    }
  }

  async comparePassword(password: string, attempt: string): Promise<boolean> {
    return await compare(password, attempt);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: any){
    try{
      const UserExist =  await this.userRepository.findOne({where: {id:id, enabled: true}});

    if (!UserExist) {
      return new UserResponse(`User with id ${id} is not registered`);
    }
    return new UserResponse('',UserExist);
    }catch (error){
      return new UserResponse(`An error ocurred when finding user: ` + error.message);
    }
    //return `This action returns a #${id} User`;
  }

  async update(id: any, updateUserDto: UpdateUserDto) {
    try{
      const UserExist =  await this.userRepository.findOne({where: {id: id, enabled: true}});

      if (!UserExist){
        return new UserResponse(`User with id ${id} is not registered`);
        }
      const salt = await genSalt(+process.env.SALT)
      updateUserDto.password = await hash(updateUserDto.password, salt);
      const updatedUser = Object.assign(UserExist,updateUserDto);
      let updateUser = await this.userRepository.save(updatedUser);
      return new UserResponse('', updateUser);
    }catch(error){
      return new UserResponse(`An error ocurred when updating user: ` + error.message);
    }
    //return `This action updates a #${id} User`;
  }

  async remove(id: any) {
    try{
      const UserExist =  await this.userRepository.findOne({where: {id: id, enabled: true}});

    if (!UserExist)return new UserResponse(`User with id ${id} is not registered`);
    const deletedUser = await this.userRepository.save({
      id: id,
      enabled: false
    });
    return new UserResponse('',deletedUser);
    }catch(error){
      return new UserResponse(`An error ocurred when finding ` + error.message);
    }
  }
}


