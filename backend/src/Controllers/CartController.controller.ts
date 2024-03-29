import { Controller, Post, Delete, Param, Get, ParseIntPipe, UseGuards, Req, Body, Put } from '@nestjs/common';
import { CartService } from './../Services/CartService.service';
import { JwtGuard } from 'src/guards/jwt.guard';
import { BaseResponse } from 'src/Responses/BaseResponse';
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { UserEntity } from './../Entities/UserEntity.entity'; 
import { CreateOrderDto } from 'src/Dto/createOrderDto.dto';
import { Roles } from 'src/Decorators/role.decorator';
import { Role } from 'src/Entities/Role.enum';
import { get } from 'http';
import { EditOrderDto } from 'src/Dto/editOrderDto.dto';


@ApiBearerAuth()
@ApiTags("Cart Controller")
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add/:userId/:productId/:qty')
async addToCart(@Param('userId') userId: number, @Param('productId') productId: number, @Param("qty") qty: number) : Promise<BaseResponse> {
  return await this.cartService.addToCart(userId, productId, qty);
}

@Delete('deleteFromCart/:userId/:cartProductId')
async deleteFromCart(
  @Param('userId') userId: number,
  @Param('cartProductId') cartProductId: number,
) {
  return this.cartService.deleteFromCart(userId, cartProductId)
}

@Delete('reduceQtyinCart/:userId/:cartProductId')
async reduceQtyinCart(@Param('userId') userId: number, @Param('cartProductId') cartProductId: number,
) {
  return this.cartService.reduceQtyInCart(userId, cartProductId);
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

 @UseGuards(JwtGuard)
 @Roles(Role.ADMIN)
 @Put("updateOrderInformation/:orderId")
 async updateOrderInformation(@Param("orderId") orderId: number, @Body() editOrderDto: EditOrderDto): Promise<BaseResponse>{
  return await this.cartService.editOrderInformation(orderId, editOrderDto)
 }

 @ApiBody({
  schema: {
    type: 'object',
    properties: {
      newStatus: {
        type: 'string',
      },
    },
  }, 
})
 @UseGuards(JwtGuard)
 @Roles(Role.ADMIN)
 @Put("updateOrderStatus/:orderId")
 async updateOrderStatus(@Param("orderId") orderId: number, @Body() newStatus: String):Promise<BaseResponse>{
  return await this.cartService.updateOrderStatus(orderId, newStatus)
 }



}
