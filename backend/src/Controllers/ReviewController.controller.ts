import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ReviewService } from './../Services/ReviewService.service';
import { ReviewEntity } from './../Entities/Review.entity';
import { BaseResponse } from "src/Responses/BaseResponse";
import { CreateReviewDto } from './../Dto/createReviewDto.dto';
import { ApiTags} from "@nestjs/swagger";

@ApiTags("Reviews Controller")
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get("getallreviews")
  getAllReviews(): Promise<ReviewEntity[]> {
    return this.reviewService.getAllReviews();
  }

  @Get('getwebsitereview')
  getWebsiteReviews(): Promise<ReviewEntity[]> {
    return this.reviewService.getWebsiteReviews();
  }

  @Get('getproduct/:productId')
  getProductReviews(@Param('productId') productId: number): Promise<ReviewEntity[]> {
    return this.reviewService.getProductReviews(productId);
  }

  @Post('createwebsitereview')
  async createWebsiteReview(@Body() createReviewDto: CreateReviewDto): Promise<BaseResponse> {
    return this.reviewService.createWebsiteReview(createReviewDto);
  }

  @Post('Createproductreview/:productId')
  async createProductReview(@Param('productId') productId: number, @Body() createReviewDto: CreateReviewDto): Promise<BaseResponse> {
    return this.reviewService.createProductReview(productId, createReviewDto);
  }
}
