import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, ModelCtor } from 'sequelize-typescript';
import { CountOptions, QueryTypes, Transaction } from 'sequelize';
import { handleSequelizeError } from './sequelize-error-handler';
import * as fs from 'fs';
import * as path from 'path';
import { QueryOptions } from '../query-options/query-options';
import { plainToClass } from 'class-transformer';
import * as xml2js from 'xml2js';

@Injectable()
export class BaseRepository<T extends Model<T>> {
  private cachedQueries: { [key: string]: { [key: string]: string } } = {};

  protected constructor(private readonly entity: ModelCtor<T>) {
    this.loadAllQueries();
  }

  protected async create(createDto: any, transaction: Transaction): Promise<T> {
    try {
      return await this.entity.create(createDto, { transaction });
    } catch (error) {
      handleSequelizeError(error, this.entity.name);
    }
  }

  protected async findAll(): Promise<T[]> {
    return this.entity.findAll();
  }

  protected async findOne(id: number): Promise<T> {
    const instance = await this.entity.findByPk(id);
    if (!instance) {
      throw new NotFoundException(
        `${this.entity.name} with ID '${id}' not found`,
      );
    }
    return instance;
  }

  protected async findOneByField(field: string, value: any): Promise<T> {
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

  protected async findAllByField(field: string, value: any): Promise<T[]> {
    return this.entity.findAll({ where: { [field]: value } as any });
  }

  protected async count(options?: CountOptions): Promise<number> {
    return this.entity.count(options);
  }

  protected async bulkCreate(
    createDtos: any[],
    transaction: Transaction,
  ): Promise<T[]> {
    try {
      return await this.entity.bulkCreate(createDtos, { transaction });
    } catch (error) {
      handleSequelizeError(error, this.entity.name);
    }
  }

  protected async exists(field: string, value: any): Promise<boolean> {
    const count = await this.entity.count({ where: { [field]: value } as any });
    return count > 0;
  }

  protected async update(
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

  protected async remove(id: number, transaction: Transaction): Promise<void> {
    const instance = await this.findOne(id);
    try {
      await instance.destroy({ transaction });
    } catch (error) {
      handleSequelizeError(error, this.entity.name);
    }
  }

  protected async getDataHora(): Promise<Date> {
    try {
      const result = await this.entity.sequelize.query('select now()', {
        type: QueryTypes.SELECT,
      });

      return new Date(result[0]['now']);
    } catch (error) {
      handleSequelizeError(error, this.entity.name);
    }
  }

  protected async executarQuery<M>(
    queryOptions: QueryOptions,
    transaction: Transaction,
    ResultType?: { new(): M },
  ): Promise<M[] | T[] | any> {
    let resultados;
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
            const transformedResults = resultados.map((result) =>
              plainToClass(ResultType, result, {
                excludeExtraneousValues: true,
              }),
            );
            return transformedResults as M[];
          }
          return resultados as M[];

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

  private async loadAllQueries(): Promise<void> {
    const baseDir = path.join(__dirname, '../../..', 'core/query');

    const loadQueriesFromDirectory = async (directory: string) => {
      const filesAndFolders = await fs.promises.readdir(directory);

      for (const name of filesAndFolders) {
        const fullPath = path.join(directory, name);
        const stat = await fs.promises.stat(fullPath);

        if (stat.isDirectory()) {
          await loadQueriesFromDirectory(fullPath);
        } else if (stat.isFile() && fullPath.endsWith('.xml')) {
          const folder = path.basename(fullPath, '.xml');
          const fileContent = await fs.promises.readFile(fullPath, 'utf8');
          const queryXml = await this.parseXmlQuery(fileContent);

          if (queryXml && queryXml.queries) {
            if (!this.cachedQueries[folder]) {
              this.cachedQueries[folder] = {};
            }
            for (const [key, value] of Object.entries(queryXml.queries)) {
              if (typeof value === 'string') {
                this.cachedQueries[folder][key] = value;
              }
            }
          }
        }
      }
    };

    await loadQueriesFromDirectory(baseDir);
  }
  private async reloadQueries(): Promise<void> {
    this.cachedQueries = {};
    await this.loadAllQueries();
  }

  private async getQueryFromPath(nomeConsulta: string): Promise<string> {
    const [folder, fileName] = nomeConsulta.split('.');
    if (!this.cachedQueries[folder]) {
      await this.reloadQueries();
    }
    const folderCopy = { ...this.cachedQueries };
    if (folderCopy[folder] && folderCopy[folder][fileName]) {
      return folderCopy[folder][fileName];
    }

    throw new NotFoundException(`Consulta '${nomeConsulta}' não encontrada`);
  }

  private async parseXmlQuery(xmlContent: string): Promise<any> {
    const parser = new xml2js.Parser({ explicitArray: false });
    return await parser.parseStringPromise(xmlContent);
  }
}
