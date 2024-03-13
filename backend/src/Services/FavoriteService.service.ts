import { Injectable , NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/Entities/UserEntity.entity';
import { ProductEntity } from 'src/Entities/Product.entity'; 
import { FavoriteEntity } from 'src/Entities/Favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(FavoriteEntity)
    private readonly favoriteRepository: Repository<FavoriteEntity>,
  ) {}

  async addToFavorites(userId: number, productId: number): Promise<void> {
    const user = await this.userRepository.findOne({where: { userId},});
    const product = await this.productRepository.findOne({where: { productId },});

    if (!user || !product) {
      throw new Error('User or product not found');
    }

    const favorite = new FavoriteEntity();
    favorite.user = user;
    favorite.product = product;
    
    await this.favoriteRepository.save(favorite);
  }

  async removeFromFavorites(userId: number, productId: number): Promise<void> {
    const user = await this.userRepository.findOne({where: { userId},});
    const product = await this.productRepository.findOne({where: {productId},});

    if (!user || !product) {
      throw new NotFoundException('User or product not found');
    }

    const favorite = await this.favoriteRepository.findOne({ where: { user, product } });

    if (!favorite) {
      throw new NotFoundException('Favorite not found');
    }

    await this.favoriteRepository.remove(favorite);
  }

  async getUserFavorites(Id: number): Promise<FavoriteEntity[]> {
    return this.favoriteRepository.find({
      where: { user: { userId: Id } }, 
      relations: ['product'], 
    });
  }
}
