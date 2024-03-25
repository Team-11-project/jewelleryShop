import { Injectable , NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/Entities/UserEntity.entity';
import { ProductEntity } from 'src/Entities/Product.entity'; 
import { FavoriteEntity } from 'src/Entities/Favorite.entity';
import { BaseResponse } from 'src/Responses/BaseResponse';

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

  async addToFavorites(userId: number, productId: number): Promise<BaseResponse> {
    const user = await this.userRepository.findOne({where: { userId},});
    const product = await this.productRepository.findOne({where: { productId },});

    if (!user || !product) {
      return {
        status: 404,
        message: "User or product not found"
      }
    }

    const favorite = new FavoriteEntity();
    favorite.user = user;
    favorite.product = product;
    await this.favoriteRepository.save(favorite);

    return {
      status: 200,
      message: "added to favorites",
      response: favorite
    }
  }

  async removeFromFavorites(userId: number, productId: number): Promise<BaseResponse> {
    const user = await this.userRepository.findOne({where: { userId},});
    const product = await this.productRepository.findOne({where: {productId},});

    if (!user || !product) {
      return {
        status: 404,
        message: "user or product not found"
      }
    }

    const favorite = await this.favoriteRepository.findOne({ where: { user, product } });

    if (!favorite) {
      return {
        status: 404,
        message: "favorite not found"
      }
    }

    await this.favoriteRepository.remove(favorite);

    return {
      status: 200,
      message: "removed from favorites"
    }

  }

  async getUserFavorites(userId: number): Promise<BaseResponse> {

    const user = await this.userRepository.findOne({where: { userId}});

    if(!user) {
      return {
        status: 404,
        message: "user not found"
      }
    }

    const favorites = await this.favoriteRepository.find({
      where: {user: user},
      relations: ['product']
    }) 

    if(favorites.length < 1){
      return {
        status: 204,
        message: "user has no favorites"
      }
    }
    else{
      return {
        status: 200,
        message: "favorites found",
        response: favorites
      }
    }
  }
}
