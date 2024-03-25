
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryInbox } from '../Entities/InventoryInbox.entity';
import { ProductEntity } from '../Entities/Product.entity';
import { BaseResponse } from 'src/Responses/BaseResponse';

@Injectable()
export class InventoryInboxService {
    constructor(
        @InjectRepository(InventoryInbox)
        private inventoryInboxRepository: Repository<InventoryInbox>,
        @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>,
    ) {}

    async createNotification(message: string, productId: number) :Promise<BaseResponse> {
        // console.log(`Creating notification with message: ${message}, productId: ${productId}`);
      const product = await this.productRepository.findOne({ where: { productId } });
      if (!product) {
        return {
          status: 404,
          message: 'Product not found'
        }
      }
      else{
      // check if the notification already exists
      const existingNotification = await this.inventoryInboxRepository.findOne({
          where: {
              message : message,
              product: product
          }
      });
  
      
      if (!existingNotification) {
        const notification = new InventoryInbox()
        notification.createdAt = new Date()
        notification.message = message
        notification.product = product
      const newNot = this.inventoryInboxRepository.save(notification);
      return {
        status: 200,
        message: 'new Stock alert, check inbox',
        response: newNot
      }
      }
      else{
        return {
          status:204,
          message:"no new stock alert"
        }
      }
    }
  
      
      
  }
  
  

    // async deleteNotification(notificationId: number): Promise<void> {
    //     const result = await this.inventoryInboxRepository.delete(notificationId);
    //     if (result.affected === 0) {
    //         throw new Error('Notification not found or could not be deleted');
    //     }
    // }

    async deleteNotification(id: number): Promise<BaseResponse> {
            try {
              const notification = await this.inventoryInboxRepository.findOne({where:{id:id}})
              console.log(notification)
              if(!notification){
                return{
                  status: 404,
                  message: "notification not found"
                }
              }
        
              await this.inventoryInboxRepository.remove(notification);

              return{
                status: 200,
                  message: "notification deleted"
              }
        
              
            } catch (error) {
              return{
                status:400,
                message:error.message
              }
            }
            
          }

    async getAllNotifications(){
        try {
            const notifications = await this.inventoryInboxRepository.find()
            return notifications
        } catch (error) {
            console.log(error)
            
        }
    }
}
