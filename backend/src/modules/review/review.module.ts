import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Review } from './entities/review.entity';
import { ReviewRepository } from './repository/review.repository';

@Module({
  imports: [SequelizeModule.forFeature([Review])],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository],
})
export class ReviewModule { }
