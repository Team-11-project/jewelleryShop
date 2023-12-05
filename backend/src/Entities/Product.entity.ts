import { Column, Entity, ManyToOne, ManyToMany, PrimaryGeneratedColumn ,JoinTable} from "typeorm";
import { CategoryEntity } from "./Category.entity";
import { CartEntity } from "./Cart.entity";


@Entity()
export class ProductEntity{
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

    // @Column()
    // stock: string

    @Column()
    details: string

    @Column()
    price: number

    @Column()
    image: string

    @Column({default: null})
    stock: number

    @Column()
    createdAt: Date

    @ManyToMany(type => CartEntity, cart => cart.products)
    @JoinTable()
    carts: CartEntity[];
}