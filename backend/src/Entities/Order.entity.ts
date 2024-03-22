import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CartEntity } from "./Cart.entity";
import { OrderStatus } from "./OrderStatus.enum";
import { PaymentInfoEntity } from "./PaymentInfo.entity";
import { AddressEntity } from "./Address.entity";
import { UserEntity } from "./UserEntity.entity";
import { ProductEntity } from "./Product.entity";
import { ReturnEntity } from "./Return.entity"
import { CartProdEntity } from "./cartProd.entity";

@Entity()
export class OrderEntity{
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => UserEntity, (user) => user.orders)
    user: UserEntity

    @OneToMany(() => CartProdEntity, product => product.order)
    cartProducts: CartProdEntity[];

    @Column()
    createdAt: Date

    @Column()
    totalPrice: number

    @Column()
    status: OrderStatus

    @Column({default: null})
    city: String

    @Column({default: null})
    address: String

    @Column({default: null})
    postcode : String

    @Column({default: null})
    country: String

    @Column({default: null})
    cardNumber: String

    @Column({default: null})
    cardHolder: String

    //address
    @Column({default: null})
    expiryDate: Date

    @Column({default: null})
    cvc: String

    @OneToMany(() => ReturnEntity, ReturnEntity => ReturnEntity.order)
    return: ReturnEntity[];
}