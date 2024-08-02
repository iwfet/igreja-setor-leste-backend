import { Model, ModelCtor } from 'sequelize-typescript';
import { CustomRequest } from '../../custom/custom-request.interface';
import { BaseRepository } from './base.repository';
import { CountOptions } from 'sequelize';
import { QueryOptions } from '../query-options/query-options';

export abstract class RequestScopeRepository<
  T extends Model<T>,
> extends BaseRepository<T> {
  protected constructor(
    entity: ModelCtor<T>,
    protected readonly request: CustomRequest,
  ) {
    super(entity);
  }

  protected getTransactionScope() {
    return this.request.transaction;
  }

  async create(createDto: any): Promise<T> {
    return super.create(createDto, this.getTransactionScope());
  }

  async findAll(): Promise<T[]> {
    return super.findAll();
  }

  async findOne(id: number): Promise<T> {
    return super.findOne(id);
  }

  async findOneByField(field: string, value: any): Promise<T> {
    return super.findOneByField(field, value);
  }

  async findAllByField(field: string, value: any): Promise<T[]> {
    return super.findAllByField(field, value);
  }

  async count(options?: CountOptions): Promise<number> {
    return super.count(options);
  }

  async bulkCreate(createDtos: any[]): Promise<T[]> {
    return super.bulkCreate(createDtos, this.getTransactionScope());
  }

  async exists(field: string, value: any): Promise<boolean> {
    return super.exists(field, value);
  }

  async update(id: number, updateDto: any): Promise<void> {
    return super.update(id, updateDto, this.getTransactionScope());
  }

  async remove(id: number): Promise<void> {
    return super.remove(id, this.getTransactionScope());
  }

  async getDataHora(): Promise<Date> {
    return super.getDataHora();
  }

  // @ts-ignore
  async executarQuery<M>(
    queryOptions: QueryOptions,
    ResultType?: { new (): M },
  ): Promise<M[] | T[] | any> {
    return super.executarQuery(
      queryOptions,
      this.getTransactionScope(),
      ResultType,
    );
  }
}
