import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

import { ROLE_KEY } from '../decorators/role-auth.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const requiredRole = this.reflector.getAllAndOverride(ROLE_KEY, [context.getHandler(), context.getClass()]);

      if (!requiredRole) {
        return true;
      }

      if (!req.headers.authorization) {
        throw new UnauthorizedException('Пользователь не авторизован');
      }

      const [ bearer, token ] = req.headers.authorization.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('Пользователь не авторизован');
      }

      const user = this.jwtService.verify(token);
      req.user = user;

      if (user.role !== requiredRole) {
        throw new ForbiddenException('Нет доступа');
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}
