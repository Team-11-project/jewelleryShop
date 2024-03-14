// create-review.dto.ts
import { IsBoolean, IsNumber, IsString } from "@nestjs/class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @IsString()
  @ApiProperty({ example: 'John Doe', description: 'Name of the customer', required: true })
  customerName: string;

  @IsString()
  @ApiProperty({ example: 'Great product!', description: 'Content of the review', required: true })
  content: string;

  @IsBoolean()
  @ApiProperty({ example: false, description: 'Indicates whether the review is for the website (true) or a product (false)', required: true })
  isWebsiteReview: boolean;
}
