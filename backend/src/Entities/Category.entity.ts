import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./Product.entity";

@Entity()
export class CategoryEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    categoryName: string

    @OneToMany(() => ProductEntity, (product) => product.category)
    products: ProductEntity[]
}