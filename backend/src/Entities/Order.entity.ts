import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CartEntity } from "./Cart.entity";
import { OrderStatus } from "./OrderStatus.enum";
import { PaymentInfoEntity } from "./PaymentInfo.entity";
import { AddressEntity } from "./Address.entity";
import { UserEntity } from "./UserEntity.entity";
import { ProductEntity } from "./Product.entity";

@Entity()
export class OrderEntity{
    @PrimaryGeneratedColumn()
    id: number

    // @OneToOne(() => CartEntity, { "cascade": true })
    // @JoinColumn({ name: "cartId" } )
    // cart: CartEntity;

    // @ManyToOne(() => CartEntity, (cart) => cart.orders)
    // cart: CartEntity

    @ManyToOne(() => UserEntity, (user) => user.orders)
    user: UserEntity

    @OneToMany(() => ProductEntity, product => product.order)
    products: ProductEntity[];

    //one cart can have many orders
    //many orders can have the same cart

    // @Column()
    // paymentDetail: PaymentInfoEntity

    // @Column()
    // shippingAddress: AddressEntity

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
}