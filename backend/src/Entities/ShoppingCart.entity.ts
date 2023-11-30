import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./User.entity";
import { ProductEntity } from "./Product.entity";

@Entity()
export class ShoppingCartEntity {
    @PrimaryGeneratedColumn()
    cartId: number;

    @ManyToOne(() => UserEntity, (user) => user.shoppingCarts)
    user: UserEntity;

    @OneToMany(() => ProductEntity, (product) => product.shoppingCarts)
    products: ProductEntity[];

    @Column()
    createdAt: Date;
}
