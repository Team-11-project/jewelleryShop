import { Controller, Post, Delete, Param, Get, ParseIntPipe, UseGuards, Req, Body } from '@nestjs/common';
import { CartService } from './../Services/CartService.service';
import { JwtGuard } from 'src/guards/jwt.guard';
import { BaseResponse } from 'src/Responses/BaseResponse';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserEntity } from './../Entities/UserEntity.entity'; 
import { CreateOrderDto } from 'src/Dto/createOrderDto.dto';


@ApiBearerAuth()
@ApiTags("Cart Controller")
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add/:userId/:productId')
async addToCart(@Param('userId') userId: number, @Param('productId') productId: number) {
  return this.cartService.addToCart(userId, productId);
}

@Delete('remove/:userId/:productId')
async removeFromCart(
  @Param('userId') userId: number,
  @Param('productId') productId: number,
) {
  return this.cartService.removeFromCart(userId, productId);
}

  @Get('getOrCreateCart/:userId')
  async getOrCreateCart(@Param('userId') userId: number) {
      const result = await this.cartService.getOrCreateCart(userId);
      return result;
    }

  // @UseGuards(JwtGuard)
    @Get("getCartByUserId/:userId")
    async getCartByUserId(@Param("userId") userId: number): Promise<BaseResponse> {
        return await this.cartService.getCartByUserId(userId);
    }

    @Delete('removeAll/:userId')
   async removeAllFromCart(
  @Param('userId') userId: number
) {
  return this.cartService.removeAllFromCart(userId);
}

 @UseGuards(JwtGuard)
 @Post("createOrder")
 async createCart(@Body() createOrderDto: CreateOrderDto): Promise<BaseResponse>{
  return await this.cartService.createOrder(createOrderDto);
 }
}
