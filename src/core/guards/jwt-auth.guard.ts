import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { GlobalQueryRepository } from '../database/global-repositoy/global.repository';
import { QueryOptionsBuilder } from '../database/query-options/query-options-builder';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private globalQueryRepository: GlobalQueryRepository,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.isPublicRoute(context)) {
      return true;
    }

    const canActivate = await super.canActivate(context);
    if (!canActivate) return false;

    if (this.isRouteAllowed(context)) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.admin) {
      return true;
    }

    return this.checkEndpointPermission(user.usuarioId, request.url);
  }

  private isPublicRoute(context: ExecutionContext): boolean {
    return this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  private isRouteAllowed(context: ExecutionContext): boolean {
    return this.reflector.getAllAndOverride<boolean>('allowAccess', [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  private async checkEndpointPermission(
    userId: number,
    endpoint: string,
  ): Promise<boolean> {
    const query = new QueryOptionsBuilder()
      .createNamedQuery('EndpointTelas.buscarEndpointUsuario')
      .setTypeSelect()
      .setParameter('id', userId)
      .build();

    const resultado = await this.globalQueryRepository.executarQuery(
      query,
      null,
    );

    const hasPermission = resultado.some(
      (result) => result.endpoint === endpoint,
    );
    if (!hasPermission) {
      throw new UnauthorizedException(
        'Você não tem permissão para acessar este recurso',
      );
    }
    return true;
  }
}
