// import { Controller, Post, Delete, Param, Body, HttpCode, HttpStatus, ValidationPipe, Get } from '@nestjs/common';
// import { CreateNotificationDto } from '../Dto/createNotificationDto.dto';
// import { NotificationService } from '../Services/NotificationService.service';
// import { InventoryInboxService } from '../Services/InventoryInboxService.service';
// import { ApiTags } from '@nestjs/swagger';

// @ApiTags("Notifications Controller (Stock)")
// @Controller('notifications')
// export class NotificationController {
//   constructor(
//     private readonly notificationService: NotificationService,
//     private readonly inventoryInboxService: InventoryInboxService // Inject InventoryInboxService
//   ) {}

//   @Post()
//   createNotification(@Body(new ValidationPipe()) createDto: CreateNotificationDto) {
//     console.log(createDto); // For debugging
//     return this.notificationService.createNotification(createDto.message, createDto.productId);
//   }

//   @Delete(':id')
//   delete(@Param('id') id: number) {
//     return this.notificationService.deleteNotification(id);
//   }

//   @Get("getAllNotifications")
//   async getAllNotifications(){
//     return await this.inventoryInboxService.getAllNotifications()
//   }
// }
