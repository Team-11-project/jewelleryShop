import { Body, Controller, Post } from '@nestjs/common';
import { ContactService } from '../services/contact.service';
import { ContactDto } from '../dto/contact.dto';
import { MailService } from 'src/Mail/MailService.service';

@Controller('api/contact')
export class ContactController {
  constructor(private mailService: MailService) {}

  @Post()
  async submitContactForm(@Body() contactData: ContactDto): Promise<any> {
    return this.mailService.handleContactForm(contactData);
  }
}
