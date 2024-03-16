import { Controller, Post, Delete, Param, Body } from '@nestjs/common';
import { InventoryInboxService } from '../Services/InventoryInboxService.service';

@Controller('inventory-inbox')
export class InventoryInboxController {
    constructor(private readonly inventoryInboxService: InventoryInboxService) {}

    @Post()
    createNotification(@Body() createDto: { message: string, productId: number }) {
        return this.inventoryInboxService.createNotification(createDto.message, createDto.productId);
    }

    @Delete(':id')
    deleteNotification(@Param('id') id: number) {
        return this.inventoryInboxService.deleteNotification(id);
    }
}
