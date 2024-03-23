import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './UserEntity.entity'; 
import { ProductEntity } from './Product.entity'; 
import { OrderEntity } from './Order.entity';
import { CartProdEntity } from './cartProd.entity';

@Entity('cart')
export class CartEntity {
    @PrimaryGeneratedColumn()
    cartId: number;

    @OneToOne(() => UserEntity, user => user.cart)
    @JoinColumn()
    user: UserEntity;

    // @OneToMany(() => ProductEntity, product => product.cart)
    // products: ProductEntity[];

    @OneToMany(() => CartProdEntity, product => product.cart, {onDelete: 'CASCADE'})
    cartProducts: CartProdEntity[];

    @Column()
    isSubmitted: Boolean

    @Column({ type: 'date' })
    createdAt: Date

}