import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from 'src/Entities/Product.entity';
import { CartEntity } from 'src/Entities/Cart.entity';
import { UserEntity } from 'src/Entities/UserEntity.entity';
import { BaseResponse } from 'src/Responses/BaseResponse';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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
}