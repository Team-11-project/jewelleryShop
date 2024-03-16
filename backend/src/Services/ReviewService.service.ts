import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../entities/Review.entity';
import { CreateReviewDto } from '../dto/createReview.dto';
import { UserEntity } from '../entities/UserEntity.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(createReviewDto: CreateReviewDto, userId: number): Promise<Review> {
    const user = await this.userRepository.findOne({ where: { userId: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    const review = this.reviewRepository.create({
      ...createReviewDto,
      user, // Associate review with the fetched user
    });
    return this.reviewRepository.save(review);
  }

  async findByProductId(productId: number): Promise<Review[]> {
    return this.reviewRepository.find({
      where: { product: { productId: productId } },
    });
  }

  async updateReview(reviewId: number, updateReviewDto: CreateReviewDto): Promise<Review> {
    const review = await this.reviewRepository.findOne({ where: { id: reviewId } }); 
    if (!review) {
      throw new Error('Review not found');
    }
    Object.assign(review, updateReviewDto);
    return this.reviewRepository.save(review);
  }

  async deleteReview(reviewId: number): Promise<void> {
    const result = await this.reviewRepository.delete(reviewId);
    if (result.affected === 0) {
      throw new Error('Review not found or could not be deleted');
    }
  }
}
