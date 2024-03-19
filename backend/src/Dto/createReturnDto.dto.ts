import { IsNumber, IsString, IsArray, IsDate } from "@nestjs/class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class CreateReturnDto {
  @IsNumber()
  @ApiProperty({ example: 1, description: 'Order ID', required: true })
  orderId: number;

  @IsArray()
  @ApiProperty({ type: 'number', description: 'List of product IDs', required: true })
  returnedProducts: number[];

  @IsDate()
  @ApiProperty({ example: '2024-03-01T10:00:00Z', description: 'Date created', required: true })
  dateCreated: Date;

  @IsNumber()
  @ApiProperty({ example: 100.99, description: 'Total price', required: true })
  totalPrice: number;

  @IsString()
  @ApiProperty({ example: 'pending', description: 'Status of return', required: true })
  status: string;
}
