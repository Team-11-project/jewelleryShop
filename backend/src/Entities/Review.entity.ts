import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ProductEntity } from './Product.entity';
import { UserEntity } from './UserEntity.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ type: 'numeric' })
  rating: number;

  @ManyToOne(() => ProductEntity, product => product.reviews)
  product: ProductEntity;

  @ManyToOne(() => UserEntity, user => user.reviews, { eager: false })
  user: UserEntity;  
}
