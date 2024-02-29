import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
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

}