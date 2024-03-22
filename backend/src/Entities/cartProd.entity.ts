import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './UserEntity.entity'; 
import { ProductEntity } from './Product.entity'; 
import { OrderEntity } from './Order.entity';
import { CartEntity } from './Cart.entity';

@Entity('cart-product')
export class CartProdEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => CartEntity, cart => cart.cartProducts)
    cart: CartEntity;

    @OneToOne(() => ProductEntity, product => product.cart)
    @JoinColumn()
    product: ProductEntity;

    @Column()
    qty: number

    @ManyToOne(() => OrderEntity, order => order.cartProducts)
    order: OrderEntity;
}