import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }
  @Get()
  async findAll() {
    return await this.reviewService.findAll();
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return await this.reviewService.update(id, updateReviewDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.reviewService.remove(id);
  }

  @Get('user/:userId')
  async findReviewsByUser(@Param('userId') userId: string) {
    return await this.reviewService.findByUser(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.reviewService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateReviewDto) {
    return await this.reviewService.createReview(dto.userId, dto.rating, dto.comment);
  }
}
