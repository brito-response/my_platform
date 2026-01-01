import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/base/base.repository";
import { InjectModel } from "@nestjs/sequelize";
import { Category } from "../entities/category.entity";
import { Job } from "src/modules/job/entities/job.entity";

@Injectable()
export class CategoryRepository extends BaseRepository<Category> {
    constructor(@InjectModel(Category) private readonly categoryModel: typeof Category) {
        super(categoryModel);
    }

    async buscarJobsPorCategoria(categoryId: string): Promise<Job[]> {
        const category = await this.categoryModel.findByPk(categoryId, {
            include: [{ model: Job, through: { attributes: [] }, },],
        });

        return category?.jobs ?? [];
    }
}