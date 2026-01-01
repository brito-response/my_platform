import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { BaseService } from 'src/common/base/base.service';
import { Category } from './entities/category.entity';
import { CategoryRepository } from './repository/category.repository';
import { ApiError } from 'src/common/errors/api.error';
import { Job } from '../job/entities/job.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService extends BaseService<Category, CreateCategoryDto, UpdateCategoryDto> {
  constructor(private readonly categoryRepository: CategoryRepository) {
    super(categoryRepository);
  }

  async getJobsByCategory(categoryId: string): Promise<Job[]> {
    const category = await this.categoryRepository.findOne(categoryId);
    if (!category) throw new ApiError(`Categoria com ID ${categoryId} não encontrada.`, 404);

    const jobs = await this.categoryRepository.buscarJobsPorCategoria(categoryId);
    if (!jobs.length) throw new ApiError("Nenhum job encontrado para esta categoria.", 404);

    return jobs;
  }

}
