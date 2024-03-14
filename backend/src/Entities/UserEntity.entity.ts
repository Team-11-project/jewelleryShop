import { Column, Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn} from "typeorm";
import { Role } from "./Role.enum";
import { CartEntity } from "./Cart.entity";
import { FavoriteEntity } from "./Favorite.entity";
import { AddressEntity } from "./Address.entity";
import { PaymentInfoEntity } from "./PaymentInfo.entity";
import { OrderEntity } from "./Order.entity";

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

    @OneToMany(() => OrderEntity, order => order.user)
    orders: OrderEntity[];

    // @OneToMany(() => AddressEntity, (address) => address.customer)
    // addresses: AddressEntity[]

    @OneToOne(() => AddressEntity)
    @JoinColumn()
    address: AddressEntity

    // @OneToMany(() => PaymentInfoEntity, (paymentInfo) => paymentInfo.customer)
    // payments: PaymentInfoEntity[]

    @OneToOne(() => PaymentInfoEntity)
    @JoinColumn()
    paymentInfo: PaymentInfoEntity

}