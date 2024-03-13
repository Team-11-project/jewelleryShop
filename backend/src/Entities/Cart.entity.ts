import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './UserEntity.entity'; 
import { ProductEntity } from './Product.entity'; 
import { OrderEntity } from './Order.entity';

@Entity('cart')
export class CartEntity {
    @PrimaryGeneratedColumn()
    cartId: number;

    @OneToOne(() => UserEntity)
    @JoinColumn({'name': 'cart'})
    user: UserEntity;

    @OneToMany(() => ProductEntity, product => product.cart)
    products: ProductEntity[];

    @Column()
    isSubmitted: Boolean

    @Column({ type: 'date' })
    createdAt: Date

}