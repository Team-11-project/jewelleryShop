import { Controller, Post, Delete, Param, Body, HttpCode, HttpStatus, ValidationPipe, Get } from '@nestjs/common';
import { CreateNotificationDto } from '../Dto/createNotificationDto.dto';
import { NotificationService } from '../Services/NotificationService.service';
import { InventoryInboxService } from '../Services/InventoryInboxService.service';

@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly inventoryInboxService: InventoryInboxService // Inject InventoryInboxService
  ) {}

  @Post()
  createNotification(@Body(new ValidationPipe()) createDto: CreateNotificationDto) {
    console.log(createDto); // For debugging
    return this.inventoryInboxService.createNotification(createDto.message, createDto.productId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.notificationService.deleteNotification(+id);
  }

  @Get("getAllNotifications")
  async getAllNotifications(){
    return await this.inventoryInboxService.getAllNotifications()
  }
}
