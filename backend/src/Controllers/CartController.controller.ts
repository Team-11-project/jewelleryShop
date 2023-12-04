import { Controller, Post, Delete, Param, Get, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { CartService } from './../Services/CartService.service';
import { JwtGuard } from 'src/guards/jwt.guard';
import { BaseResponse } from 'src/Responses/BaseResponse';
import { UserEntity } from './../Entities/UserEntity.entity'; 

@Controller('cart')
@UseGuards(JwtGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add/:productId')
  async addToCart(@Req() req, @Param('productId', ParseIntPipe) productId: number) {
    const userId = req.user.userId; 
    return this.cartService.addToCart(userId, productId);
  }

  @Delete('remove/:productId')
  async removeFromCart(@Req() req, @Param('productId', ParseIntPipe) productId: number) {
    const userId = req.user.userId; 
    return this.cartService.removeFromCart(userId, productId);
  }

  @Get(':userId')
  async getOrCreateCart(@Param('userId') userId: number) {
      const result = await this.cartService.getOrCreateCart(userId);
      return result;
    }



  @UseGuards(JwtGuard)
    @Get("getCartByUserId/:userId")
    async getCartByUserId(@Param("userId") userId: number): Promise<BaseResponse> {
        return await this.cartService.getCartByUserId(userId);
    }
}
