import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from '../Dto/createReview.dto';
import { UserEntity } from '../Entities/UserEntity.entity';
import { ReviewEntity } from '../Entities/Review.entity';
import { BaseResponse } from "../Responses/BaseResponse";
import { ProductEntity } from 'src/Entities/Product.entity';


@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private reviewRepository: Repository<ReviewEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ProductEntity)
        private productRepository: Repository<ProductEntity>,
  ) {}

  async create(createReviewDto: CreateReviewDto, productId: number): Promise<ReviewEntity> {
    const user = await this.userRepository.findOne({ where: { userId: createReviewDto.userId } });
    if (!user) {
      throw new Error('User not found');
    }

    // const review = this.reviewRepository.create({
    //   ...createReviewDto,
    //   user,
    // });
    const newreview = new ReviewEntity()
    newreview.content= createReviewDto.content
    newreview.customerName= createReviewDto.customerName
    newreview.user= user
    newreview.rating= createReviewDto.rating
    newreview.isWebsiteReview= createReviewDto.isWebsiteReview
    newreview.product= await this.productRepository.findOne({where: {productId: productId}}) 
    newreview.title= createReviewDto.title
    return await this.reviewRepository.save(newreview);
  }

  async findByProductId(productId: number): Promise<ReviewEntity[]> {
    return this.reviewRepository.find({
      where: { product: { productId: productId } },
    });
  }

  async updateReview(reviewId: number, updateReviewDto: CreateReviewDto): Promise<ReviewEntity> {
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
      // review.productId = productId;

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
    return this.reviewRepository.find({relations: ['user']});
  }

  async getWebsiteReviews(): Promise<ReviewEntity[]> {
    return this.reviewRepository.find({ where: { isWebsiteReview: true }, relations: ['user'] });
  }

  async getProductReviews(productId: number): Promise<ReviewEntity[]> {
    return this.reviewRepository
      .createQueryBuilder('review')
      .where('review.productId = :productId', { productId })
      .andWhere('review.isWebsiteReview = :isWebsiteReview', { isWebsiteReview: false })
      .getMany();
  }

  async getProductReviewByUserId(userId: number){
    try {
      return await this.reviewRepository.find({
        where: {
          user: {userId: userId},
          isWebsiteReview: false
        },
        relations: ['product']
      })
      
    } catch (error) {
      console.log(error)
    }
  }
}
