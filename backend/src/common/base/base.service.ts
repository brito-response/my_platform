import { InferCreationAttributes } from 'sequelize';
import { BaseRepository } from './base.repository';
import { Model } from 'sequelize-typescript';
import { ApiError } from '../errors/api.error';

export class BaseService<T extends Model, C, U, I> {
  constructor(protected readonly repository: BaseRepository<T>, protected readonly mapper: (entity: T) => I) { }

  async create(createDto: C): Promise<I> {
    const entity = await this.repository.create(createDto as InferCreationAttributes<T>);
    return this.mapper(entity);
  }

  async findAll(): Promise<I[]> {
    const entities = await this.repository.findAll();
    return entities.map(this.mapper);
  }

  async findOne(id: string): Promise<I> {
    const entity = await this.repository.findOne(id);
    if (!entity) { throw new ApiError('the resource sought with this identifier is not found in the application!', 404); };
    return this.mapper(entity);
  }

  async update(id: string, updateDto: U): Promise<I> {
    await this.findOne(id);
    const [affectedCount, entities] = await this.repository.update(id, updateDto);
    if (!affectedCount || !entities || entities.length === 0) throw new ApiError('Update failed', 400);
    return this.mapper(entities[0]);
  }

  async updatePartial(id: string, data: Partial<T>): Promise<I> {
    const resource = await this.findOne(id);
    const [affectedCount, entities] = await this.repository.updatePartial(id, data);
    if (!affectedCount || !entities || entities.length === 0) throw new ApiError('Update failed', 400);
    return this.mapper(entities[0]);
  }

  async remove(id: string): Promise<number> {
    const resource = await this.repository.findOne(id);
    if (!resource) throw new ApiError('The resource to be deleted, with that identifier is not found in the application!', 404);
    return await this.repository.remove(id);
  }
}
