import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CartEntity } from "./Cart.entity";
import { OrderStatus } from "./OrderStatus.enum";

@Entity()
export class OrderEntity{
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => CartEntity, { "cascade": true })
    @JoinColumn({ name: "cartId" } )
    cart: CartEntity;

    @Column()
    paymentDetail: String

    @Column()
    shippingAddress: String

    @Column()
    billingAddress: String

    @Column()
    createdAt: Date

    @Column()
    totalPrice: Number

    @Column()
    status: OrderStatus
}