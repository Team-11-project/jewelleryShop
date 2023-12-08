import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable, OneToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './UserEntity.entity'; 
import { ProductEntity } from './Product.entity'; 

@Entity('cart')
export class CartEntity {
    @PrimaryGeneratedColumn()
    cartId: number;

    @OneToOne(() => UserEntity, user => user.carts)
    user: UserEntity;

    @OneToMany(type => ProductEntity, product => product.carts)
    products: ProductEntity[];

    @Column()
    isSubmitted: Boolean

    @Column()
    details: string

    @Column({ type: 'date' })
    createdAt: Date

}