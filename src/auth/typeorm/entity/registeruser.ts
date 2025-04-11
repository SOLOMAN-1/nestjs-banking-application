import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'registeruser'})
export class RegisterUser{
    @PrimaryGeneratedColumn({type:'bigint'})
    id:number;
    @Column()
    firstName:string;
    @Column()
    lastName:string;
    @Column()
    phoneNumber:number;
    @Column()
    email:string;
    @Column()
    password:string;
    @Column()
    address:string;
    

}   