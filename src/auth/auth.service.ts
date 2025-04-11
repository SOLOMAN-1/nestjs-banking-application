import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUser } from './typeorm/entity/registeruser';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/registerdto';
import { LoginDto } from './dto/logindto';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(RegisterUser) private bankingRepository:Repository<RegisterUser>) {}
    register(registerDto: RegisterDto) {
        const password=registerDto.password;
        const confirm_password=registerDto.confirm_password;
        if(password===confirm_password){
            const newUser=this.bankingRepository.create(registerDto);
            this.bankingRepository.save(newUser);
            return"Accout successfully created .Use email id as username and password as password";
        }else{
            return "password and confirm password does not match";
        }
    }
    validate(loginDtop:LoginDto){
        
    }
}
