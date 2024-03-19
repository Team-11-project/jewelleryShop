import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { OrderEntity } from "src/Entities/Order.entity";
import { UserEntity } from "src/Entities/UserEntity.entity";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(body:string, user:UserEntity) {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        from: '"Regalia" <regalia912@gmail.com>', // sender address
        subject: "Reset your password", // Subject line
        template: './ForgotPassword',
        context:{
          name: user.firstName,

          otp: body
        }
      });
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error
      };
    }
  }

  async sendOrderStatusUpdateNotification(user: UserEntity, order: OrderEntity): Promise<boolean> {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        from: '"Regalia" <regalia912@gmail.com>',
        subject: 'Order Status Update',
        template: './OrderStatusUpdate',
        context: {
          name: user.firstName,
          orderId: order.id,
          status: order.status,
        },
      });
      return true;
    } catch (error) {
      console.error('Failed to send order status update notification:', error);
      return false;
    }
  }

  async newOrderNotification(body:string, user:UserEntity, order:OrderEntity){
    try {
      await this.mailerService.sendMail({
        to: user.email,
        from: '"Regalia <no reply>" <regalia912@gmail.com>', // sender address
        subject: "Order confirmed", // Subject line
        template: './NewOrder',
        context:{
          name: user.firstName,
          orderId: order.id,
        }
      });
      return {
        success: true,
      };
      
    } catch (error) {
      return {
        success: false,
        error: error
      };
      
    }
  }

}