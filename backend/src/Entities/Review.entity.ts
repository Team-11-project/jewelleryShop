import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ProductEntity } from './Product.entity';
import { UserEntity } from './UserEntity.entity';

@Entity()
export class ReviewEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  productId: number; 

  @Column({ type: 'numeric' })
  rating: number;

  @Column({ default: false })
  isWebsiteReview: boolean;

  @ManyToOne(() => ProductEntity, product => product.reviews)
  product: ProductEntity;

  @ManyToOne(() => UserEntity, user => user.reviews, { eager: false })
  user: UserEntity;   
}
