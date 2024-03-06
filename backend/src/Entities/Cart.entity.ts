import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './UserEntity.entity'; 
import { ProductEntity } from './Product.entity'; 

@Entity('cart')
export class CartEntity {
    @PrimaryGeneratedColumn()
    cartId: number;

    @OneToOne(() => UserEntity, user => user.cart)
    @JoinColumn({ name: 'userId' })
    user: UserEntity;

    @OneToMany(() => ProductEntity, product => product.carts)
    products: ProductEntity[];

    @Column()
    isSubmitted: Boolean

    @Column({ type: 'date' })
    createdAt: Date

}