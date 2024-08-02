import { Request } from 'express';
import { Transaction } from 'sequelize';

export interface UserPayload {
  usuarioId: number;
  admin: boolean;
}

export interface CustomRequest extends Request {
  transaction: Transaction;
  user?: UserPayload;
}
