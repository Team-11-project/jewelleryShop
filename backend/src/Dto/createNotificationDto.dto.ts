import { IsNotEmpty } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  @IsNotEmpty()
  @ApiProperty({example: "something", required: true})
  message: string;

  @IsNotEmpty()
  @ApiProperty({example: 2, required: true})
  productId: number;

  
}
