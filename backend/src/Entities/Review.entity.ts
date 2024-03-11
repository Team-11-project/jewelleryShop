import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity()
export class ReviewEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  productId: number;


  @Column({ default: false })
  isWebsiteReview: boolean;
}
