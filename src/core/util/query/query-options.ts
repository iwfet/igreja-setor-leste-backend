import { QueryOptionsBuilder } from './query-options-builder';
import { Transaction } from 'sequelize';

export class QueryOptions {
  private _filePath: string;
  private _type: string;
  private _parameters: { [key: string]: any };
  private _transaction: Transaction;

  constructor(builder: QueryOptionsBuilder) {
    this._filePath = builder.filePath;
    this._type = builder.type;
    this._parameters = builder.parameters || {};
    this._transaction = builder.transaction;
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
