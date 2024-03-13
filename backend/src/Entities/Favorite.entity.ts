import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './UserEntity.entity'; 
import { ProductEntity } from './Product.entity'; 


@Entity()
export class FavoriteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, user => user.favoriteProducts)
  user: UserEntity;

  @ManyToOne(() => ProductEntity, product => product.favorites)
  product: ProductEntity;
}
