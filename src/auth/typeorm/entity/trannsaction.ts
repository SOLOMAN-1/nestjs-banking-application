import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RegisterUser } from "./registeruser";

@Entity({name:'transaction'})
export class Transaction{
    @PrimaryGeneratedColumn()
    id:bigint;
    @Column()
    type:string;
    @Column('decimal', { precision: 12, scale: 2 })
    amount:number;
    @CreateDateColumn()
    date:Date;
    @ManyToOne(()=>RegisterUser,(user)=>user.sentTransactions,{nullable:true})
    sender:RegisterUser;
    @ManyToOne(()=>RegisterUser, (user)=>user.receivedTransactions, {nullable:true})
    reciever:RegisterUser;


}