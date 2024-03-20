import { Injectable } from '@nestjs/common';
import { ContactDto } from '../Dto/contact.dto';

@Injectable()
export class ContactService {
  async handleContactForm(contactData: ContactDto): Promise<any> {
    // Implement logic
    console.log(contactData);
    return { success: true, message: 'Your message has been received.' };
  }
}
