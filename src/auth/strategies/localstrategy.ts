import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportModule, PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
   
    constructor(private authService:AuthService){
        super();
    }
    async validate(username:string,password:string) {
       const user =await  this.authService.validate({username,password});
       if(!user){
        throw new UnauthorizedException("User not found");
       }

       return user;
    }
}