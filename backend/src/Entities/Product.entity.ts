import { Column, Entity, ManyToOne, ManyToMany, PrimaryGeneratedColumn ,JoinTable, OneToMany} from "typeorm";
import { CategoryEntity } from "./Category.entity";
import { CartEntity } from "./Cart.entity";
import { FavoriteEntity } from "./Favorite.entity";import { OrderEntity } from "./Order.entity";
import { ReviewEntity } from './Review.entity';
import { InventoryInbox } from "./InventoryInbox.entity";



@Entity()
export class ProductEntity {
    @PrimaryGeneratedColumn()
    productId: number

    @Column()
    name: string

    @ManyToOne(() => CategoryEntity, (category) => category.products)
    category: CategoryEntity;

    @Column()
    keywords: string

    @Column()
    material: string

    @Column()
    details: string

    @Column()
    price: number

    @Column({ nullable: true })
    image: string

    @Column({ default: null })
    stock: number

    @Column()
    createdAt: Date

    @ManyToOne(() => CartEntity, cart => cart.products)
    carts: CartEntity;

    @OneToMany(() => ReviewEntity, (review) => review.product)
    reviews: ReviewEntity[];

    @OneToMany(() => InventoryInbox, inventoryInbox => inventoryInbox.product)
    notifications: InventoryInbox[];

    cart: CartEntity;

    @OneToMany(() => FavoriteEntity, favorite => favorite.product)
    favorites: FavoriteEntity[];

    @ManyToOne(() => OrderEntity, order => order.products)
    order: OrderEntity;
}