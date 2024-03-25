import { Controller, Post, Param, BadRequestException, ParseIntPipe, Delete, Get } from '@nestjs/common';
import { FavoritesService } from 'src/Services/FavoriteService.service';
import { ApiTags} from "@nestjs/swagger";
import { FavoriteEntity } from 'src/Entities/Favorite.entity';
import { BaseResponse } from 'src/Responses/BaseResponse';

@ApiTags("Favorites Controller")
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('addToFavorites/:userId/:productId')
  async addToFavorites(@Param('userId') userId: number, @Param('productId') productId: number): Promise<BaseResponse> {
    return await this.favoritesService.addToFavorites(userId, productId);
  }

  @Delete('remove-from-favorites/:userId/:productId')
  async removeFromFavorites(@Param('userId') userId: number,@Param('productId') productId: number): Promise<BaseResponse> {
    return await this.favoritesService.removeFromFavorites(userId, productId);
}

  @Get('/:userId')
  async getUserFavorites(@Param('userId') userId: number): Promise<BaseResponse> {
    return this.favoritesService.getUserFavorites(userId);
  }
}
