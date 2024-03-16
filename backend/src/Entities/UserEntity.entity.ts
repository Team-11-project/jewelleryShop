import { Column, Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn} from "typeorm";
import { Role } from "./Role.enum";
import { CartEntity } from "./Cart.entity";
import { Review } from './Review.entity';

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

    @OneToOne(() => CartEntity)
    @JoinColumn({name: 'cartId'})
    cart: CartEntity;

    @OneToMany(() => Review, review => review.user)
    reviews: Review[];

}