import { Column } from "typeorm";

export class RegisterDto{
    firstName:string;
       
        lastName:string;
     
        phoneNumber:number;
    
        email:string;
   
        password:string;
     
        confirm_password:String;
        address:string;
}