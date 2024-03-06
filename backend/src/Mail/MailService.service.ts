import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { ContactDto } from "src/Dto/contact.dto";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(userEmail:string, body:string) {
    try {
      await this.mailerService.sendMail({
        to: userEmail,
        from: '"Regalia" <regalia912@gmail.com>', // sender address
        subject: "Reset your password", // Subject line
        text: 'text', // plaintext body
        html:'<p> This is your OTP '+body+ '</p>' ,
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