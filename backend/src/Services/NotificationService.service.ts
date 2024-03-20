import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationEntity } from '../Entities/Notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationEntity)
    private notificationRepository: Repository<NotificationEntity>,
  ) {}

  async createNotification(message: string): Promise<NotificationEntity> {
    const notification = this.notificationRepository.create({ message });
    return this.notificationRepository.save(notification);
  }

  async deleteNotification(id: number): Promise<void> {
    await this.notificationRepository.delete(id);
  }
}
