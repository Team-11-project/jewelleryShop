import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { ProductEntity } from './Product.entity'; // Adjust the import path as needed

@Entity()
export class InventoryInbox {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

    @ManyToOne(() => ProductEntity, product => product.notifications, { eager: true })
    product: ProductEntity;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
}
