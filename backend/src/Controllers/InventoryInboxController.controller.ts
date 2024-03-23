import { Controller, Post, Delete, Param, Body, Get } from '@nestjs/common';
import { InventoryInboxService } from '../Services/InventoryInboxService.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateNotificationDto } from 'src/Dto/createNotificationDto.dto';
import { InventoryService } from 'src/Services/InventoryService.service';

@ApiTags("Notifications Controller (Stock)")
@Controller('notification')
export class InventoryInboxController {
    constructor(private readonly inventoryInboxService: InventoryInboxService,
      private readonly inventoryService: InventoryService) {}

    @Post("createNotification")
  async createNotification(@Body() createDto: CreateNotificationDto) {
    console.log(createDto); // For debugging
        return await this.inventoryInboxService.createNotification(createDto.message, createDto.productId);
}

@Post("checkProd/:productId")
async checkProd(@Param("productId") productId: number) {
      return await this.inventoryService.checkInventoryAndNotify(productId)
}

    @Delete(':id')
    deleteNotification(@Param('id') id: number) {
        return this.inventoryInboxService.deleteNotification(id);
    }

    @Get("getAllNotifications")
  async getAllNotifications(){
    return await this.inventoryInboxService.getAllNotifications()
  }
}
