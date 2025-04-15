import { Column } from "typeorm";

export class RegisterDto{
    firstName:string;
        lastName:string;
        phoneNumber:number;
        email:string;
        address:string;
        password:string;
        role:string;
        
        confirm_password:String;
}