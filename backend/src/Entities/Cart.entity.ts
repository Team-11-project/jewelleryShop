import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './UserEntity.entity'; // Assuming you have a UserEntity
import { ProductEntity } from './Product.entity'; // Assuming you have a ProductEntity

@Entity('cart')
export class CartEntity {
    @PrimaryGeneratedColumn()
    cartId: number;

    @ManyToMany(type => ProductEntity, product => product.carts)
    @JoinTable()
    products: ProductEntity[];

    @Column()
    keywords: string

    @Column()
    material: string

    @Column()
    details: string

    @Column()
    price: number

    @Column()
    image: string

    @OneToOne(() => UserEntity, user => user.carts)
    @JoinColumn({ name: 'userId' }) 
    user: UserEntity;

}