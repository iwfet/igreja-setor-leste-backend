import { Request } from 'express';
import { Transaction } from 'sequelize';

export interface CustomRequest extends Request {
  transaction: Transaction;
}
