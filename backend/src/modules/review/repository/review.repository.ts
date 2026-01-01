import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/base/base.repository";
import { InjectModel } from "@nestjs/sequelize";
import { Review } from "../entities/review.entity";

@Injectable()
export class ReviewRepository extends BaseRepository<Review> {
    constructor(@InjectModel(Review) private readonly reviewModel: typeof Review) {
        super(reviewModel);
    }

    async findByUser(userId: string): Promise<Review[]> {
        return await this.reviewModel.findAll({ where: { userId } });
    }

    async findAll(): Promise<Review[]> {
        return await this.reviewModel.findAll();
    }

    async findOne(id: string): Promise<Review | null> {
        return await this.reviewModel.findByPk(id);
    }
}