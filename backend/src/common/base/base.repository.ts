import { FindAndCountOptions, WhereOptions } from 'sequelize';
import { Model, ModelCtor } from 'sequelize-typescript';

export class BaseRepository<T extends Model> {
  private readonly primaryKeyField: string;

  constructor(private readonly model: ModelCtor<T>) {
    this.primaryKeyField = this.getPrimaryKeyField();
  }

  async create(data: T['_creationAttributes']): Promise<T> {
    return this.model.create(data);
  }

  async findAll(): Promise<T[]> {
    return this.model.findAll();
  }

  async findOne(id: string): Promise<T | null> {
    return this.model.findByPk(id);
  }

  async update(id: string, data: Partial<T['_creationAttributes']>): Promise<[number, T[]]> {
    const where = { [this.primaryKeyField]: id } as WhereOptions;
    return this.model.update(data, { where, returning: true });
  }

  async updatePartial(id: string, data: Partial<T['_creationAttributes']>): Promise<[number, T[]]> {
    const where = { [this.primaryKeyField]: id } as WhereOptions;
    return this.model.update(data, { where, returning: true });
  }

  async remove(id: string): Promise<number> {
    const where = { [this.primaryKeyField]: id } as WhereOptions;
    return this.model.destroy({ where });
  }

  public async findWithPagination(limit: number, offset: number, options?: Omit<FindAndCountOptions, 'group'>): Promise<{ rows: T[]; count: number }> {
    return await this.model.findAndCountAll({ limit, offset, ...options });
  }

  private getPrimaryKeyField(): string {
    const attributes = this.model.getAttributes();
    const pkAttr = Object.entries(attributes).find(([_, attr]) => (attr as any).primaryKey);

    if (!pkAttr) throw new Error(`Primary key not found in model ${this.model.name}`);
    return pkAttr[0];
  }
}
