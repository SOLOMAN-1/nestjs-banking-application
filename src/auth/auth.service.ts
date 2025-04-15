import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUser } from './typeorm/entity/registeruser';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/registerdto';
import { LoginDto } from './dto/logindto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Transaction } from './typeorm/entity/trannsaction';
import { TransferDto } from './dto/transferdto';
@Injectable()
export class AuthService {
 

    constructor(@InjectRepository(RegisterUser) private bankingRepository:Repository<RegisterUser>,
                private jwtservice:JwtService,
            @InjectRepository(Transaction) private transferRepository:Repository<Transaction>) {}
    async register(registerDto: RegisterDto) {
        const password1=registerDto.password;
        const confirm_password=registerDto.confirm_password;
        if(password1===confirm_password){
            const saltRounds=10;
            const hashedpassword= await bcrypt.hash(password1,saltRounds);
            const newUser= this.bankingRepository.create({...registerDto,
                                                    password:hashedpassword});
            await this.bankingRepository.save(newUser);
            return"Accout successfully created .Use email id as username and password as password";
        }else{
            return "password and confirm password does not match";
        }
    }
    async validate(loginDtop:LoginDto){
        
        const user= await this.bankingRepository.findOneBy({email:loginDtop.username});
        if(user?.loginAttempt==3){
            
            throw new UnauthorizedException("Your account is blocked. You need to reset your password or contact your branch");
    
        }
        if(user == null){
            throw new UnauthorizedException("User not found");
        }
        const password=loginDtop.password;
        const orgPassword=user.password;
        const loginHashedPassword=await bcrypt.compare(password,orgPassword);
        if(loginHashedPassword){  
                return user;
        }else{
            user.loginAttempt=user.loginAttempt+1;
            if(user.loginAttempt>=3){
                user.isBlocked=true;
            }
            await this.bankingRepository.save(user);
            throw new UnauthorizedException("password doesnot match  not found");
        }

        
    }
    async approve(id: bigint) {
       const user= await this.bankingRepository.findOne({where:{id:id}});
       console.log(id)
       console.log(user);
       if(user){
        if(user.role==="ADMIN"){
            return "You are already an admin";
        
        }
        if(user.isApproved ==true){
            return "User already approved";
        }
        while(true){
            const accountNumber=Math.floor(Math.random() * 10000000000);
            const user1 =await this.bankingRepository.findOneBy({accountNumber:accountNumber});
            if(!user1){
                user.accountNumber=accountNumber;
                user.isApproved=true;
                await this.bankingRepository.save(user);
                
                return `User approved and the user account number is ${user.accountNumber}`;
            }
        }
       }else{
        return "User not found";
       }
    }
    // details(id: number) {
    //     const user= this.bankingRepository.findOneBy({id:id});
    // }
    async deposit(id: bigint, amount: number) {
        const user=await this.bankingRepository.findOneBy({id:id});
        if(user){
            const totalDeposit=user?.totalDeposit;
            const updatedTotalDeposit=totalDeposit+amount;
            user.totalDeposit=updatedTotalDeposit;
            const updatedBalance=user.balance+amount;
            user.balance=updatedBalance;
            await this.bankingRepository.save(user);
            //update transaction table
            
            await this.transferRepository.save({type:"deposit", amount:amount, sender:user})
        return `Amount deposited successfully and the balance is ${user.balance}`;
    }
    else{
        return "User not found.";
    }

    }
    async withdraw(id: bigint, amount: number) {
        const user=await this.bankingRepository.findOneBy({id:id});
        if(user){
            const totalWithdraw=user?.totalWithdraw;
            const updatedTotalWithdraw=totalWithdraw+amount;
            user.totalWithdraw=updatedTotalWithdraw;
            const updatedBalance=user.balance-amount;
            user.balance=updatedBalance;
            await this.bankingRepository.save(user);
            await this.transferRepository.save({type:"withdraw", amount:amount, reciever:user})

        return `Amount withdrawn successfully and the balance is ${user.balance}`;
    }
    else{
        return "User not found.";
    }
    }
    async transfer(id: any, body: TransferDto) {
        const user=await this.bankingRepository.findOneBy({id:id});
        if(user){
        user.balance=user.balance-body.amount;
        await this.bankingRepository.save(user);
        const reciever=await this.bankingRepository.findOneBy({id:body.id});
        if(reciever){
            reciever.balance=reciever.balance+body.amount;
            await this.bankingRepository.save(reciever);
            await this.transferRepository.save({type:"transfer", amount:body.amount, sender:user, reciever:reciever})
            return `Amount transferred successfully and the balance is ${user.balance}`;
        }else{
            return "Reciever not found";
        }
        }
    }

    
}
