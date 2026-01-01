import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { BaseService } from 'src/common/base/base.service';
import { Review } from './entities/review.entity';
import { ReviewRepository } from './repository/review.repository';
import { ApiError } from 'src/common/errors/api.error';
import { InferAttributes } from 'sequelize';

@Injectable()
export class ReviewService extends BaseService<Review, CreateReviewDto> {
  constructor(private readonly reviewRepository: ReviewRepository) {
    super(reviewRepository);
  }

  async findByUser(userId: string) {
    const reviews = await this.reviewRepository.findByUser(userId);
    if (!reviews.length) throw new ApiError('No reviews found for this user', 404);
    return reviews;
  }

  async findOne(reviewId: string) {
    const review = await this.reviewRepository.findOne(reviewId);
    if (!review) throw new ApiError('Review not found', 404);
    return review;
  }

  async createReview(userId: string, rating: number, comment?: string) {
    if (rating < 1 || rating > 5) throw new ApiError('Rating must be between 1 and 5', 400);
    return await this.reviewRepository.create({ rating, comment: comment ?? null, userId } as InferAttributes<Review>);
  }

  async findAll() {
    return this.reviewRepository.findAll();
  }
}
