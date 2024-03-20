import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../Entities/Product.entity';
import { InventoryInboxService } from './InventoryInboxService.service';
import { InventoryInbox } from 'src/Entities/InventoryInbox.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    private inventoryInboxService: InventoryInboxService 
  ) {}

  async checkInventoryAndNotify(productId: number) {
    const product = await this.productRepository.findOne({ where: { productId } });
    if (!product) {
      throw new Error('Product not found');
    }
    
    if (product.stock <= 0) {
      await this.inventoryInboxService.createNotification(`Product ${product.name} is out of stock.`, productId);
    } else if (product.stock < 3) {
      await this.inventoryInboxService.createNotification(`Stock for ${product.name} is low.`, productId);
    }
  }
}