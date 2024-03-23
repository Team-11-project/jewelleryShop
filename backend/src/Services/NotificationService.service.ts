// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { NotificationEntity } from '../Entities/Notification.entity';
// import { BaseResponse } from 'src/Responses/BaseResponse';
// import { ProductEntity } from 'src/Entities/Product.entity';

// @Injectable()
// export class NotificationService {
//   constructor(
//     @InjectRepository(NotificationEntity)
//     private notificationRepository: Repository<NotificationEntity>,
//     @InjectRepository(ProductEntity)
//         private productRepository: Repository<ProductEntity>,
//   ) {}

//   // async createNotification(message: string, productId:number): Promise<NotificationEntity> {
//   //   const notification = this.notificationRepository.create({ message });
//   //   return this.notificationRepository.save(notification);
//   // }
//   async createNotification(message: string, productId: number): Promise<BaseResponse> {
//     // console.log(`Creating notification with message: ${message}, productId: ${productId}`);
//   const product = await this.productRepository.findOne({ where: { productId } });
//   if (!product) {
//     return{
//       status: 404,
//       message: 'Product not found'
//     }
//   }

//   // check if the notification already exists
//   const existingNotification = await this.notificationRepository.findOne({
//       where: {
//           message : message,
//           product: product
//       }
//   });

  
//   if (existingNotification) {
//       return "notification already exists";
//   }

//   const notification = this.inventoryInboxRepository.create({
//       message,
//       product
//   });
//   return this.inventoryInboxRepository.save(notification);
// }

//   async deleteNotification(id: number): Promise<BaseResponse> {
//     try {
//       const notification = await this.notificationRepository.findOne({where:{id:id}})
//       console.log(notification)
//       if(!notification){
//         return{
//           status: 404,
//           message: "notification not found"
//         }
//       }

//       // await this.notificationRepository.delete(notification);
//       return{
//         status: 200,
//           message: "notification deleted"
//       }

      
//     } catch (error) {
//       return{
//         status:400,
//         message:error.message
//       }
//     }
    
//   }
// }
