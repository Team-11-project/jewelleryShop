import { Body, Controller, Post, Get, Param, Put, Delete } from '@nestjs/common';
import { ReviewService } from '../services/ReviewService.service';
import { CreateReviewDto } from '../dto/createReview.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags("Reviews Controller")
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('createReview')
  create(@Body() createReviewDto: CreateReviewDto) { 
    return this.reviewService.create(createReviewDto, createReviewDto.userId); 
  }

  @Get('review/:productId')
  findByProductId(@Param('productId') productId: string) {
    return this.reviewService.findByProductId(+productId);
  }
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

}
