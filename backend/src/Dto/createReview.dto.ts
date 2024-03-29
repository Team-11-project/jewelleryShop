import { IsBoolean, IsNumber, IsString } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateReviewDto {
    @IsString()
    @ApiProperty({example: '', description: "", required: true})
    customerName: string;

    @IsString()
    @ApiProperty({example: '', description: "", required: true})
    title: string;

    @IsString()
    @ApiProperty({example: '', description: "", required: true})
    content: string;

    @IsNumber()
    @ApiProperty({example: 5, description: "Rate the webiste", required: true})
    rating: number;

    // @IsNumber()
    // @ApiProperty({example: '', description: "", required: true})
    // productId: number; //  pass the product id when creating a review

    @IsNumber()
    @ApiProperty({ example: 1, description: "userID of user creting the review", required: true })
    userId: number;
    

  @IsBoolean()
    @ApiProperty({example: false, description: "", required: true})
    isWebsiteReview: boolean;
  }
  