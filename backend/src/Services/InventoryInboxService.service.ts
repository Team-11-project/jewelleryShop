
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryInbox } from '../Entities/InventoryInbox.entity';
import { ProductEntity } from '../Entities/Product.entity';

@Injectable()
export class InventoryInboxService {
    constructor(
        @InjectRepository(InventoryInbox)
        private inventoryInboxRepository: Repository<InventoryInbox>,
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>,
    ) {}

    async createNotification(message: string, productId: number): Promise<InventoryInbox> {
        const product = await this.productRepository.findOne({ where: { productId } });
        if (!product) {
          throw new Error('Product not found');
        }
      
        const notification = this.inventoryInboxRepository.create({
          message,
          product,
        });
        return this.inventoryInboxRepository.save(notification);
      }
      

    async deleteNotification(notificationId: number): Promise<void> {
        const result = await this.inventoryInboxRepository.delete(notificationId);
        if (result.affected === 0) {
            throw new Error('Notification not found or could not be deleted');
        }
    }
}