import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const isAdmin = request.user.admin;

    if (!isAdmin || isAdmin !== true) {
      throw new ForbiddenException('Acesso apenas para administradores.');
    }

    return true;
  }
}
