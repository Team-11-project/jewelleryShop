import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, ManyToMany,JoinTable} from "typeorm";
import { CategoryEntity } from "./Category.entity";
import { CartEntity } from "./Cart.entity";
import { ReviewEntity } from './review.entity';

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

    @ManyToMany(() => ReviewEntity)
    @JoinTable()
    reviews: ReviewEntity[];


}