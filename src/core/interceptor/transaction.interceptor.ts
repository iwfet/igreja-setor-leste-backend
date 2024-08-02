import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE } from '../constants';
import { tap } from 'rxjs/operators';
import { Transaction } from 'sequelize';
import { CustomRequest } from '../custom/custom-request.interface';

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  constructor(@Inject(SEQUELIZE) private readonly sequelize: Sequelize) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const transaction: Transaction = await this.sequelize.transaction();

    const request = context.switchToHttp().getRequest<CustomRequest>();
    request.transaction = transaction;

    return next.handle().pipe(
      tap({
        next: async () => {
          await transaction.commit();
        },
        error: async (err) => {
          await transaction.rollback();
          return throwError(() => err);
        },
      }),
    );
  }
}
