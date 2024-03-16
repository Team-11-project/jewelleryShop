import { Controller, Post, Param, BadRequestException, ParseIntPipe, Delete, Get } from '@nestjs/common';
import { FavoritesService } from 'src/Services/FavoriteService.service';
import { ApiTags} from "@nestjs/swagger";
import { FavoriteEntity } from 'src/Entities/Favorite.entity';

@ApiTags("Favorites Controller")
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('add to favorites/:userId/:productId')
  async addToFavorites(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('productId', ParseIntPipe) productId: number
  ): Promise<void> {
    try {
      await this.favoritesService.addToFavorites(userId, productId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete('remove-from-favorites/:userId/:productId')
async removeFromFavorites(
  @Param('userId', ParseIntPipe) userId: number,
  @Param('productId', ParseIntPipe) productId: number
): Promise<void> {
  try {
    await this.favoritesService.removeFromFavorites(userId, productId);
  } catch (error) {
    throw new BadRequestException(error.message);
  }
}


  @Get(':userId')
  async getUserFavorites(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<FavoriteEntity[]> {
    return this.favoritesService.getUserFavorites(userId);
  }
}
