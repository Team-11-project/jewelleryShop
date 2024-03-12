// review.service.ts
import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewEntity } from './../Entities/Review.entity';
import { BaseResponse } from "src/Responses/BaseResponse";
import { CreateReviewDto } from './../Dto/createReviewDto.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
  ) {}

  async createWebsiteReview(createReviewDto: CreateReviewDto): Promise<BaseResponse> {
    try {
      const review = new ReviewEntity();
      review.customerName = createReviewDto.customerName;
      review.content = createReviewDto.content;
      review.isWebsiteReview = true;

      const newReview = await this.reviewRepository.save(review);

      return {
        status: 200,
        message: "Website review created",
        response: newReview
      };
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        message: "Internal server error",
        response: error
      };
    }
  }

  async createProductReview(productId: number, createReviewDto: CreateReviewDto): Promise<BaseResponse> {
    try {
      const review = new ReviewEntity();
      review.customerName = createReviewDto.customerName;
      review.content = createReviewDto.content;
      review.productId = productId;

      const newReview = await this.reviewRepository.save(review);

      return {
        status: 200,
        message: "Product review created",
        response: newReview
      };
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        message: "Internal server error",
        response: error
      };
    }
  }


  async getAllReviews(): Promise<ReviewEntity[]> {
    return this.reviewRepository.find();
  }

  async getWebsiteReviews(): Promise<ReviewEntity[]> {
    return this.reviewRepository.find({ where: { isWebsiteReview: true } });
  }

  async getProductReviews(productId: number): Promise<ReviewEntity[]> {
    return this.reviewRepository
      .createQueryBuilder('review')
      .where('review.productId = :productId', { productId })
      .andWhere('review.isWebsiteReview = :isWebsiteReview', { isWebsiteReview: false })
      .getMany();
  }
}
