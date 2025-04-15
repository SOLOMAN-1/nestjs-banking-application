import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "./trannsaction";

@Entity({name:'registeruser'})
export class RegisterUser{
    @PrimaryGeneratedColumn({type:'bigint'})
    id:bigint;
    @Column()
    firstName:string;
    @Column()
    lastName:string;
    @Column({type:'bigint'})
    phoneNumber:number;
    @Column()
    email:string;
    @Column()
    address:string;
    @Column({type:'bigint',default:0})
    accountNumber:number;
    @Column()
    password:string;
    @Column({default:0})
    loginAttempt:number;
    @Column({default:false})
    isBlocked:boolean;
    @Column({default:'USER'})
    role:string;
    @Column({default:false})
    isApproved:boolean;
    @Column({default:0})
    balance:number
    @Column({default:0})
    totalDeposit:number
    @Column({default:0})
    totalWithdraw:number
    @OneToMany(() => Transaction, (transaction) => transaction.sender)
    sentTransactions: Transaction[];
    @OneToMany(() => Transaction, (transaction) => transaction.reciever)
    receivedTransactions: Transaction[];
}   