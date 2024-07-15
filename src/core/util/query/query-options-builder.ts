import { QueryOptions } from './query-options';
import { Transaction } from 'sequelize';

export class QueryOptionsBuilder {
  private _filePath: string;
  private _type: string;
  private _parameters: { [key: string]: any };
  private _transaction: Transaction;

  constructor() {
    this._parameters = {};
  }

  createNamedQuery(filePath: string): QueryOptionsBuilder {
    this._filePath = filePath;
    return this;
  }

  setTypeSelect(): QueryOptionsBuilder {
    this._type = 'SELECT';
    return this;
  }

  setTypeInsert(): QueryOptionsBuilder {
    this._type = 'INSERT';
    return this;
  }

  setTypeUpdate(): QueryOptionsBuilder {
    this._type = 'UPDATE';
    return this;
  }

  setTypeDelete(): QueryOptionsBuilder {
    this._type = 'DELETE';
    return this;
  }

  setParameter(name: string, value: any): QueryOptionsBuilder {
    this._parameters[name] = value;
    return this;
  }

  set setTransaction(value: Transaction) {
    this._transaction = value;
  }

  build(): QueryOptions {
    return new QueryOptions(this);
  }

  get filePath(): string {
    return this._filePath;
  }

  get type(): string {
    return this._type;
  }

  get parameters(): { [p: string]: any } {
    return this._parameters;
  }

  get transaction(): Transaction {
    return this._transaction;
  }
}
