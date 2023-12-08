import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from 'src/Entities/Product.entity';
import { CartEntity } from 'src/Entities/Cart.entity';
import { BaseResponse } from 'src/Responses/BaseResponse';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async addToCart(userId: number, Id: number): Promise<CartEntity> {
    const cart = await this.getOrCreateCart(userId);
  
    try {
        const product = await this.productRepository.findOne({
            where: { productId: Id },
          });
  
      if (!product) {
        throw new Error('Product not found');
      }
  
      if (!cart.products.find((p) => p.productId === Id)) {
        cart.products.push(product);
      }
  
      return this.cartRepository.save(cart);
    } catch (error) {
      throw new Error('Error adding to cart: ' + error.message);
    }
  }

  async removeFromCart(userId: number, Id: number): Promise<CartEntity> {
    const cart = await this.getOrCreateCart(userId);

    cart.products = cart.products.filter((p) => p.productId !== Id);

    await this.cartRepository.save(cart);

    return cart;
  }

  async getOrCreateCart(userId: number): Promise<CartEntity> {
    let cart = await this.cartRepository.findOne({
      where: { user: { userId } },
      relations: ['products'],
    });
  
    if (!cart) {
      cart = this.cartRepository.create({
        user: { userId },
        products: [],
      });
    }
  
    return cart;
  }

  async getCartByUserId(Id: number): Promise<BaseResponse> {
    try {
        const cart = await this.cartRepository.findOne({
            where: { user: { userId: Id } },
            relations: ['products'], 
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
}