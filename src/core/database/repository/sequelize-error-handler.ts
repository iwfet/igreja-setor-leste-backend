import { BadRequestException, ConflictException } from '@nestjs/common';
import { ForeignKeyConstraintError, UniqueConstraintError, ValidationError } from 'sequelize';

export function handleSequelizeError(error: any, entity: string): void {
  if (error instanceof UniqueConstraintError) {
    const fields = error.errors.map((err) => err.path).join(', ');
    throw new ConflictException(
      `Unique constraint violation on ${entity}. Fields: ${fields}`,
    );
  } else if (error instanceof ForeignKeyConstraintError) {
    throw new ConflictException(
      `Foreign key constraint violation on ${entity}.`,
    );
  } else if (error instanceof ValidationError) {
    const messages = error.errors.map((err) => err.message).join(', ');
    throw new ConflictException(
      `Validation error on ${entity}. Messages: ${messages}`,
    );
  } else {
    throw new BadRequestException(error.message);
  }
}
