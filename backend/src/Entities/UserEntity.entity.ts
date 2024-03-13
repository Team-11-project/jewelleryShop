import { Column, Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn} from "typeorm";
import { Role } from "./Role.enum";
import { CartEntity } from "./Cart.entity";
import { FavoriteEntity } from "./Favorite.entity";

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

    @OneToMany(() => FavoriteEntity, favorite => favorite.user)
    favoriteProducts: FavoriteEntity[];

}