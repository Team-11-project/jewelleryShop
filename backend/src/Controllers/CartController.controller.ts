import { Controller, Post, Delete, Param, Get, ParseIntPipe, UseGuards, Req, Body } from '@nestjs/common';
import { CartService } from './../Services/CartService.service';
import { JwtGuard } from 'src/guards/jwt.guard';
import { BaseResponse } from 'src/Responses/BaseResponse';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserEntity } from './../Entities/UserEntity.entity'; 
import { CreateOrderDto } from 'src/Dto/createOrderDto.dto';
import { Roles } from 'src/Decorators/role.decorator';
import { Role } from 'src/Entities/Role.enum';
import { get } from 'http';


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
 async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<BaseResponse>{
  return await this.cartService.createOrder(createOrderDto);
 }

 @UseGuards(JwtGuard)
 @Roles(Role.ADMIN)
 @Delete("deleteOrder/:orderId")
 async deleteOrder(@Param("orderId") orderId: number): Promise<BaseResponse>{
  return await this.cartService.deleteOrder(orderId);
 }

 @UseGuards(JwtGuard)
 @Roles(Role.ADMIN)
 @Get("getAllOrders")
 async getAllOrders():Promise<BaseResponse>{
  return await this.cartService.getAllOrders();
 }
}
