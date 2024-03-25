import { CreateAddressDto } from './../Dto/createAddressDto.dto';
import { CreateOrderDto } from './../Dto/createOrderDto.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
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
import { EditOrderDto } from 'src/Dto/editOrderDto.dto';
import { MailService } from 'src/Mail/MailService.service';
import { CartProdEntity } from 'src/Entities/cartProd.entity';

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
    @InjectRepository(CartProdEntity)
    private readonly cartProdRepository: Repository<CartProdEntity>,
    private mailService: MailService,
  ) {}

  async addToCart(userId: number, productId: number, quantity:number): Promise<BaseResponse> {
    try {
      // Get or create the cart for the user
      let cart = await this.getOrCreateCart(userId);
  
      // Find the product by productId
      const product = await this.productRepository.findOne({
        where: { productId:productId}});

      if (!product) {
        return {
          status:404,
          message:"product not found"
        }
      }

      if(product.stock < 1){
        return {
          status:400,
          message:"product is out of stock"
        }
      }
  
      // Initialize 'products' array if not already initialized
      // console.log(cart)s
      if(!cart.cartProducts){
        cart.cartProducts = [];
      }
      else if (cart.cartProducts.length < 1) {
        cart.cartProducts = [];
      }
      // console.log(cart.products.length)

      const oldCartProd = cart.cartProducts.find((p: CartProdEntity) => p.product.productId === product.productId)
      // console.log(oldCartProd)

      // Check if the product with the given productId is already in the cart
      if (cart.cartProducts.some((cartProd: CartProdEntity) => cartProd.product.productId === product.productId)) {
        // increase qty

        oldCartProd.qty += 1
        await this.cartProdRepository.save(oldCartProd)
        await this.cartRepository.save(cart)
        return {
          status:200,
          message:"product added to cart",
          response: cart
        }
        // return this.cartRepository.save(cart);
       
      }
      else{
      const cartProduct = new CartProdEntity()
      cartProduct.product = product
      cartProduct.qty = quantity
      const newCartProd = await this.cartProdRepository.save(cartProduct)
      cart.cartProducts.push(newCartProd);
      }
        // Save the updated cart
        await this.cartRepository.save(cart)
        return {
          status:200,
          message:"product added to cart",
          response: cart
        }

    } catch (error) {
      console.log(error)
      // throw new Error('Error adding to cart: ' + error.message);
    }
  }

  async reduceQtyInCart(userId: number, cartProdId:number): Promise<BaseResponse>{
    try {
      let cart = await this.getOrCreateCart(userId);
  
      // Check if the cart has products
      if (cart.cartProducts) {
        // Filter out the product with the given productId
        const cartProd = cart.cartProducts.find((p) => p.id == cartProdId)
        if(cartProd){
          cartProd.qty = cartProd.qty - 1
          await this.cartProdRepository.save(cartProd)
        }
  
        // Save the updated cart
        return this.cartRepository.save(cart);
      } else {
        throw new Error('Cart is empty or not found');
      }

      
    } catch (error) {
      return{
        status:500,
        message: error
      }
      
    }
  }
    
  async deleteFromCart(userId: number, cartProductId: number): Promise<CartEntity> {
    try {
      // Get or create the cart for the user
      let cart = await this.getOrCreateCart(userId);
  
      // Check if the cart has products
      if (cart.cartProducts) {
        // Filter out the product with the given productId
        cart.cartProducts = cart.cartProducts.filter((p) => p.id != cartProductId);
        // await this.cartProdRepository.delete(await this.cartProdRepository.findOne({where:{id: cartProductId}}))
  
        // Save the updated cart
        await this.cartRepository.save(cart);
        return cart;

      } else {
        throw new Error('Cart is empty or not found');
      }
    } catch (error) {
      throw new Error('Error removing from cart: ' + error.message);
    }
  }

  async getOrCreateCart(Id: number): Promise<any> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          userId:Id
        }
      })
      // console.log(user)
      
     
      if(user)
      {
        let cart = await this.cartRepository.findOne({
          where: {
            user :{userId:Id}
          },
          relations:['user', 'cartProducts', 'cartProducts.product']
        })
        
          if (!cart) {
            const user = await this.userRepository.findOne({ where: { userId:Id } });
            cart = this.cartRepository.create({
              user: user,  // Ensure 'user' is a property in your CartEntity
              cartProducts: [],
              isSubmitted: false,
              createdAt: new Date
      
            });
          }
        
          return cart;
        }
      
    } catch (error) {
      
    }

}

  async getCartByUserId(Id: number): Promise<BaseResponse> {
    try {
        const cart = await this.cartRepository.findOne({
            where: { user: { userId: Id } },
            relations: ['user', 'cartProducts', 'cartProducts.product'], 
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
    if (cart.cartProducts) {
      // const cartProdsLength = cart.cartProducts.length
      // for(let i = 0; i < cartProdsLength; i++){
        // await this.cartProdRepository.delete(await this.cartProdRepository.findOne({where:{id: cart.cartProducts[i].id}}))
      // }
      cart.cartProducts = []
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
    relations: ['cartProducts', 'cartProducts.product']})
    const cartProds = cart.cartProducts
    if(cartProds.length < 1){
      return{
        status:400,
        message:'cart is empty'
      }
    }
    order.cartProducts = []
    // console.log(cartProds[0])
    for(let i = 0; i <cartProds.length; i++){
      order.cartProducts.push(cartProds[i])
    }
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
    // const newOrder = order

    if(newOrder){
      for(let i = 0; i <cartProds.length; i++){
        const newStock = cartProds[i].product.stock - cartProds[i].qty
        cartProds[i].product.stock = newStock
        await this.productRepository.save(cartProds[i].product)
      }
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

async updateOrderStatus(orderId: number, newStatus: any): Promise<BaseResponse>{
  try {
    // console.log(newStatus)
    const order = await this.orderRepository.findOne({where: {id: orderId}})

    if(!order){
      return{
        status: 404,
        message:"order not found"
      }
    }
    
    switch(newStatus.newStatus) {
        case "canceled":
        order.status = OrderStatus.CANCELED
        break;
        case "delivered":
        order.status = OrderStatus.DELIVERED
        break;
        case "in delivery":
        order.status = OrderStatus.IN_DELIVERY
        break;
        case "in progress":
        order.status = OrderStatus.IN_PROGRESS
        break;
        case "returned":
        order.status = OrderStatus.RETURNED
        break;
      default:
        return {
          status: 400,
          message: "status does not exist try 'canceled', 'in progress', 'in delivery', 'returned', 'delivered' ",
          response: newStatus
        }
    }

    await this.orderRepository.save(order)
    await this.mailService.sendOrderStatusUpdateNotification(order.user, order);

    return{
      status: 200,
      message:"status updated",
      response: order
    }
    
  } catch (error) {
    console.log(error)
  }
}

async editOrderInformation(orderId: number, editOrderDto: EditOrderDto): Promise<BaseResponse>{
  try {
    const order = await this.orderRepository.findOne({where: {id: orderId}})

    if(!order){
      return{
        status: 404,
        message:"order not found"
      }
    }

    order.city = editOrderDto.city
    order.address = editOrderDto.address
    order.postcode = editOrderDto.postcode
    order.country = editOrderDto.country

    await this.orderRepository.save(order)
    return{
      status: 200,
      message: "order updated",
      response: order
    }
  }
  catch(error){
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
      {relations: ['cartProducts', 'user', 'cartProducts.product'],
    order:{
      id: "ASC"
    }}
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