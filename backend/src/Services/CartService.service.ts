import { CreateAddressDto } from './../Dto/createAddressDto.dto';
import { CreateOrderDto } from './../Dto/createOrderDto.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from 'src/Entities/Product.entity';
import { CartEntity } from 'src/Entities/Cart.entity';
import { UserEntity } from 'src/Entities/UserEntity.entity';
import { BaseResponse } from 'src/Responses/BaseResponse';
import { OrderEntity } from 'src/Entities/Order.entity';
import { OrderStatus } from 'src/Entities/OrderStatus.enum';
import { AddressEntity } from 'src/Entities/Address.entity';
import { PaymentInfoEntity } from 'src/Entities/PaymentInfo.entity';
import { CreatePaymentDto } from 'src/Dto/createPaymentInfo.dto';
import { use } from 'passport';
import { AddressType } from 'src/Entities/AddressType.enum';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    @InjectRepository(PaymentInfoEntity)
    private readonly paymentInfoRepository: Repository<PaymentInfoEntity>,
  ) {}

  async addToCart(userId: number, productId: number): Promise<CartEntity> {
    try {
      // Get or create the cart for the user
      let cart = await this.getOrCreateCart(userId);
  
      // Find the product by productId
      const product = await this.productRepository.findOne({
        where: { productId },
      });
  
      if (!product) {
        throw new Error('Product not found');
      }
  
      // Initialize 'products' array if not already initialized
      // console.log(cart)s
      if(!cart.products){
        cart.products = [];
      }
      else if (cart.products.length < 1) {
        cart.products = [];
      }
      // console.log(cart.products.length)
  
      // Check if the product with the given productId is not already in the cart
      if (!cart.products.some((p) => p.productId === product.productId)) {
        // Add the product to the cart
        cart.products.push(product);
      }
  
      // Save the updated cart
      return this.cartRepository.save(cart);

    } catch (error) {
      throw new Error('Error adding to cart: ' + error.message);
    }
  }
    
  async removeFromCart(userId: number, productId: number): Promise<CartEntity> {
    try {
      // Get or create the cart for the user
      let cart = await this.getOrCreateCart(userId);
  
      // Check if the cart has products
      if (cart.products) {
        // Filter out the product with the given productId
        cart.products = cart.products.filter((p) => p.productId != productId);
  
        // Save the updated cart
        return this.cartRepository.save(cart);
      } else {
        throw new Error('Cart is empty or not found');
      }
    } catch (error) {
      throw new Error('Error removing from cart: ' + error.message);
    }
  }

  async getOrCreateCart(Id: number): Promise<any> {
const user = await this.userRepository.findOne({
  where: {
    userId:Id
  }
})


if(user)
{
  let cart = await this.cartRepository.findOne({
    where: {
      user :{userId:Id}
    },
    relations:['user', 'products']
  })



// {    let cart = await this.cartRepository.findOne({
//       where: { user:  user  },
//       relations: ['products'],
//     });
  
    if (!cart) {
      const user = await this.userRepository.findOne({ where: { userId:Id } });
      cart = this.cartRepository.create({
        user: user,  // Ensure 'user' is a property in your CartEntity
        products: [],
        isSubmitted: false,
        createdAt: new Date

      });
    }
  
    return cart;
  }
}

  async getCartByUserId(Id: number): Promise<BaseResponse> {
    try {
      // let cart = await this.cartRepository.findOne({
      //   where: {
      //     user :{userId:Id}
      //   },
      //   relations:['user']
      // })
        const cart = await this.cartRepository.findOne({
            where: { user: { userId: Id } },
            relations: ['user', 'products'], 
        });

        if (!cart) {
            return {
                status: 404,
                message: "Cart not found for the given user",
            };
        }

        return {
            status: 200,
            message: "Cart found",
            response: cart,
        };
    } catch (error) {
        return{
            status: 400,
            message: "Bad request",
            response: error
        }
        
    }
}

async deleteCart(userId: number): Promise<CartEntity> {
  try {
    const cartToDel = await this.cartRepository.findOne({
      where: {
        user: {userId: userId}
      }})

      if(cartToDel){
        // await this.cartRepository.remove(cartToDel);
        this.cartRepository.delete(cartToDel.cartId)
        return await this.getOrCreateCart(userId)
      }
    
  } catch (error) {
    console.log(error)
  }
}

async removeAllFromCart(userId: number): Promise<CartEntity> {
  try {
    // Get or create the cart for the user
    let cart = await this.getOrCreateCart(userId);

    // Check if the cart has products
    if (cart.products) {
      // Filter out the product with the given productId
      cart.products = [];

      // Save the updated cart
      return this.cartRepository.save(cart);
    } else {
      throw new Error('Cart is empty or not found');
    }
  } catch (error) {
    throw new Error('Error removing from cart: ' + error.message);
  }
}

async getorCreateAddress(createAddressDto: CreateAddressDto){
  try {
    const user = await this.userRepository.findOne({
      where: {
        userId:createAddressDto.userId
      }
    })
    
    if(user)
    {
      let add = await this.addressRepository.findOne({
        where: {
          user : user
        },
      })
      
        if (!add) {
          // const user = await this.userRepository.findOne({ where: { userId: user.userId } });
          add = this.addressRepository.create({
            user: user,
            town: createAddressDto.town,
            city: createAddressDto.city,
            address: createAddressDto.address,
            postcode: createAddressDto.postcode,
            country: createAddressDto.country,
          })
        }
      }
  } catch (error) {
    console.log(error)
  }
}

async createPaymentInfo(createPaymentDto: CreatePaymentDto){}

async createOrder(createOrderDto: CreateOrderDto): Promise<BaseResponse> {
  try {
    let order = new OrderEntity
    const cart = await this.cartRepository.findOne({
      where: {
        user: {userId: createOrderDto.userId}
      },
    relations: ['products']})
    order.products = cart.products
    order.createdAt = new Date
    order.status = OrderStatus.PENDING
    order.totalPrice = createOrderDto.totalPrice
    order.user = await this.userRepository.findOne({where: {userId: createOrderDto.userId}})

    //address
    order.address = createOrderDto.address
    order.postcode = createOrderDto.postcode
    order.city = createOrderDto.city
    order.country = createOrderDto.country

    //payment
    order.cardHolder = createOrderDto.cardHolder
    order.cardNumber = createOrderDto.cardNumber
    order.cvc = createOrderDto.cvc
    order.expiryDate = createOrderDto.expiryDate
    
    const newOrder = await this.orderRepository.save(order)

    if(newOrder){
      this.removeAllFromCart(createOrderDto.userId)
      
        return{
            status: 200,
            message: "order created",
            response: newOrder
        }
    }
    return{
        status: 400,
        message: "order could not be created"
    }

  } catch (error) {
    console.log(error)
  }
}

async deleteOrder(orderId: number): Promise<BaseResponse>{
  try {

    const order = await this.orderRepository.findOne(
      {
        where:{
          id: orderId
        },
        relations: ['cart'], 
      }
    )
    if(!order){
      return{
        status: 404,
        message: "order not found"
      }
    }

    // await this.orderRepository.delete(order);
    order.status = OrderStatus.CANCELED
    await this.orderRepository.save(order)
    return{
      status: 200,
      message: "order deleted"
    }

  } catch (error) {
    console.log(error)
  }
}

async getAllOrders(): Promise<BaseResponse>{
  try {

    const orders = await this.orderRepository.find(
      {relations: ['products', 'user']}
    )
    if (orders){
      return{
        status: 200,
        message: "orders found",
        response: orders
      }
  }
  return{
    status: 400,
    message: "no orders found"
  }
    
    
  } catch (error) {
    console.log(error)
  }
}

// async editOrder(orderId: number) : Promise<BaseResponse>{
//   try {
    
//   } catch (error) {

    
//   }
// }
}