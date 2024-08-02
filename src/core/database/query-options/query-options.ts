import { QueryOptionsBuilder } from './query-options-builder';

export class QueryOptions {
  private _filePath: string;
  private _type: string;
  private _parameters: { [key: string]: any };

  constructor(builder: QueryOptionsBuilder) {
    this._filePath = builder.filePath;
    this._type = builder.type;
    this._parameters = builder.parameters || {};
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
}
