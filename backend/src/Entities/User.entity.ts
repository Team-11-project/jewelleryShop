import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Role } from "./Role.enum";
import {ShoppingCartEntity} from "./ShoppingCart.entity";

@Entity()
export class UserEntity{
    @PrimaryGeneratedColumn()
    userId: number

    @Column()
    firstName: string

    @Column()
    lastName: string
    
    @Column()
    email: string
    
    @Column()
    password: string
    
    @Column({ type: 'date' })
    createdAt: Date
    
    @Column()
    isActive: boolean

    @Column()
    role: Role

    @Column()
    employeeNumber: number

    @OneToMany(() => ShoppingCartEntity, (cart) => cart.user)
    shoppingCarts: ShoppingCartEntity[];
}