import { InferCreationAttributes } from 'sequelize';
import { BaseRepository } from './base.repository';
import { Model } from 'sequelize-typescript';
import { ApiError } from '../errors/api.error';

export class BaseService<T extends Model, C> {
  constructor(protected readonly repository: BaseRepository<T>) { }

  async create(createDto: C): Promise<T> {
    const resource = createDto as InferCreationAttributes<T>;
    return await this.repository.create(resource);
  }

  async findAll(): Promise<T[]> {
    return await this.repository.findAll();
  }

  async findOne(id: string): Promise<T> {
    const resource = await this.repository.findOne(id);
    if (!resource) throw new ApiError('The resource sought with this identifier is not found in the application!', 404);
    return resource;
  }

  async update(id: string, data: Partial<T>): Promise<[number, T[]]> {
    const resource = await this.findOne(id);
    return await this.repository.update(id, data);
  }

  async remove(id: string): Promise<number> {
    const resource = await this.repository.findOne(id);
    if (!resource) throw new ApiError('The resource to be deleted, with that identifier is not found in the application!', 404);
    return await this.repository.remove(id);
  }
}
