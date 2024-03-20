import { Body, Controller, Post, Get, Param, Put, Delete } from '@nestjs/common';
import { ReviewService } from '../Services/ReviewService.service';
import { ReviewEntity } from '../Entities/Review.entity';
import { CreateReviewDto } from '../Dto/createReview.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BaseResponse } from '../Responses/BaseResponse';

@ApiBearerAuth()
@ApiTags("Reviews Controller")
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('createReview/:productId')
  create(@Param("productId") productId: number, @Body() createReviewDto: CreateReviewDto) { 
    return this.reviewService.create(createReviewDto, productId); 
  }

  @Get('review/:productId')
  findByProductId(@Param('productId') productId: string) {
    return this.reviewService.findByProductId(+productId);
  }

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

  // @Post('Createproductreview/:productId')
  // async createProductReview(@Param('productId') productId: number, @Body() createReviewDto: CreateReviewDto): Promise<BaseResponse> {
  //   return this.reviewService.createProductReview(productId, createReviewDto);
  // }
  @Put('updateReview/:reviewId')
  async updateReview(
    @Param('reviewId') reviewId: string,
    @Body() updateReviewDto: CreateReviewDto,
  ) {
    return this.reviewService.updateReview(+reviewId, updateReviewDto);
  }
  
  @Delete('deleteReview/:reviewId')
  async deleteReview(@Param('reviewId') reviewId: string) {
    await this.reviewService.deleteReview(+reviewId);
    return { message: 'Review deleted successfully' };
  }

  @Get('getProductReviewByUser/:userId')
  async getPReviewByUser(@Param("userId") userId: number){
    return await this.reviewService.getProductReviewByUserId(userId)
  }

  

}
