import { Column, Entity, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import { Role } from "./Role.enum";
import { CartEntity } from "./Cart.entity";

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

    @OneToMany(type => CartEntity, cart => cart.user)
    carts: CartEntity[];

}