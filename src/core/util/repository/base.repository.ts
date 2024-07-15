import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model, ModelCtor } from 'sequelize-typescript';
import { CountOptions, QueryTypes, Transaction } from 'sequelize';
import { handleSequelizeError } from './sequelize-error-handler';
import { Sequelize } from 'sequelize';
import * as fs from 'fs';
import * as path from 'path';
import { QueryOptions } from '../query/query-options';

@Injectable()
export class BaseRepository<T extends Model<T>> {
  private cachedQueries: { [key: string]: { [key: string]: string } } = {};

  constructor(private readonly entity: ModelCtor<T>) {}

  async create(createDto: any, transaction: Transaction): Promise<T> {
    try {
      return await this.entity.create(createDto, { transaction });
    } catch (error) {
      handleSequelizeError(error, this.entity.name);
    }
  }

  async findAll(): Promise<T[]> {
    return this.entity.findAll();
  }

  async findOne(id: number): Promise<T> {
    const instance = await this.entity.findByPk(id);
    if (!instance) {
      throw new NotFoundException(
        `${this.entity.name} with ID '${id}' not found`,
      );
    }
    return instance;
  }

  async findOneByField(field: string, value: any): Promise<T> {
    const instance = await this.entity.findOne({
      where: { [field]: value } as any,
    });
    if (!instance) {
      throw new NotFoundException(
        `${this.entity.name} with ${field} '${value}' not found`,
      );
    }
    return instance;
  }

  async findAllByField(field: string, value: any): Promise<T[]> {
    return this.entity.findAll({ where: { [field]: value } as any });
  }

  async count(options?: CountOptions): Promise<number> {
    return this.entity.count(options);
  }

  async bulkCreate(createDtos: any[], transaction: Transaction): Promise<T[]> {
    try {
      return await this.entity.bulkCreate(createDtos, { transaction });
    } catch (error) {
      handleSequelizeError(error, this.entity.name);
    }
  }

  async exists(field: string, value: any): Promise<boolean> {
    const count = await this.entity.count({ where: { [field]: value } as any });
    return count > 0;
  }

  async update(
    id: number,
    updateDto: any,
    transaction: Transaction,
  ): Promise<void> {
    const instance = await this.findOne(id);
    try {
      await instance.update(updateDto, { transaction });
    } catch (error) {
      handleSequelizeError(error, this.entity.name);
    }
  }

  async remove(id: number, transaction: Transaction): Promise<void> {
    const instance = await this.findOne(id);
    try {
      await instance.destroy({ transaction });
    } catch (error) {
      handleSequelizeError(error, this.entity.name);
    }
  }

  async executarQuery<M>(
    queryOptions: QueryOptions,
    ResultType?: new () => M,
  ): Promise<any | M[] | M | boolean> {
    let resultados;
    const transaction = queryOptions.transaction || null;
    try {
      const consulta = await this.getQueryFromPath(queryOptions.filePath);
      switch (queryOptions.type.toUpperCase()) {
        case 'SELECT':
          resultados = await this.entity.sequelize.query(consulta.toString(), {
            replacements: queryOptions.parameters,
            type: QueryTypes.SELECT,
            transaction,
          });

          if (ResultType) {
            return resultados.map((result) =>
              Object.assign(new ResultType(), result),
            );
          }
          return resultados;

        case 'INSERT':
          resultados = await this.entity.sequelize.query(consulta.toString(), {
            replacements: queryOptions.parameters,
            type: QueryTypes.INSERT,
            transaction,
          });
          return resultados;

        case 'UPDATE':
          resultados = await this.entity.sequelize.query(consulta.toString(), {
            replacements: queryOptions.parameters,
            type: QueryTypes.UPDATE,
            transaction,
          });
          return resultados;

        case 'DELETE':
          resultados = await this.entity.sequelize.query(consulta.toString(), {
            replacements: queryOptions.parameters,
            type: QueryTypes.DELETE,
            transaction,
          });
          return resultados;
        default:
          throw new Error(
            `Tipo de consulta não suportado: ${queryOptions.type}`,
          );
      }
    } catch (error) {
      handleSequelizeError(error, this.entity.name);
    }
  }

  private async getQueryFromPath(nomeConsulta: string): Promise<string> {
    const [folder, fileName] = nomeConsulta.split('.');

    if (this.cachedQueries[folder] && this.cachedQueries[folder][fileName]) {
      return this.cachedQueries[folder][fileName];
    }

    const filePath = this.findQueryFilePath(folder);

    if (!filePath) {
      throw new NotFoundException(`Consulta '${nomeConsulta}' não encontrada`);
    }

    const fileContent = await fs.promises.readFile(filePath, 'utf8');
    const queryJson = JSON.parse(fileContent);

    if (!queryJson || typeof queryJson !== 'object') {
      throw new NotFoundException(`Consulta inválida no arquivo '${filePath}'`);
    }

    const query = queryJson[fileName];

    if (!query || typeof query !== 'string') {
      throw new NotFoundException(`Consulta inválida no arquivo '${filePath}'`);
    }

    if (!this.cachedQueries[folder]) {
      this.cachedQueries[folder] = {};
    }
    this.cachedQueries[folder][fileName] = query;

    return query;
  }

  private findQueryFilePath(folder: string): string | null {
    const baseDir = path.join(__dirname, '../..', 'query');

    function searchDirectory(directory: string): string | null {
      const filesAndFolders = fs.readdirSync(directory);

      for (const name of filesAndFolders) {
        const fullPath = path.join(directory, name);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          const result = searchDirectory(fullPath);
          if (result) {
            return result;
          }
        } else if (stat.isFile() && name === `${folder}.json`) {
          return fullPath;
        }
      }
      return null;
    }

    return searchDirectory(baseDir);
  }
}
