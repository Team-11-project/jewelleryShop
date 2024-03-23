import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../Entities/Product.entity';
import { InventoryInboxService } from './InventoryInboxService.service';
import { InventoryInbox } from 'src/Entities/InventoryInbox.entity';
import { BaseResponse } from 'src/Responses/BaseResponse';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    private inventoryInboxService: InventoryInboxService 
  ) {}

  async checkInventoryAndNotify(productId: number) :Promise<BaseResponse> {
    const product = await this.productRepository.findOne({ where: { productId } });
    if (!product) {
      return {
        status: 404,
        message: 'Product not found'
      }
    }
    else{
      if (product.stock == 0) {
        return await this.inventoryInboxService.createNotification(`Product is out of stock.`, productId);
      } else if (product.stock > 1 && product.stock <= 5) {
        return await this.inventoryInboxService.createNotification(`Stock is low.`, productId);
      }
      else {
        return{
        status: 204,
        message: "no new stock alerts"
      }}
    }
    
    
  }
}