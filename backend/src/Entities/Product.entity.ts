import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEntity } from "./Category.entity";

@Entity()
export class ProductEntity{
    @PrimaryGeneratedColumn()
    id: number

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

    @Column()
    createdAt: Date
}