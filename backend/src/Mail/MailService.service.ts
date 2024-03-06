import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { OrderEntity } from "src/Entities/Order.entity";
import { UserEntity } from "src/Entities/UserEntity.entity";
import { ContactDto } from "src/Dto/contact.dto";

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

  async handleContactForm(contactData: ContactDto): Promise<any> {
    // Implement logic
    console.log(contactData);
    return { success: true, message: 'Your message has been received.' };
  }

}