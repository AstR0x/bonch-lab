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

import { TokensService } from 'src/tokens/tokens.service';
import { ITokenPayload } from 'src/auth/interfaces/token-payload.interface';

import { ROLE_KEY } from '../decorators/role-auth.decorator';
import { isExpiredToken } from '../utils';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly tokensService: TokensService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const requiredRole = this.reflector.getAllAndOverride(ROLE_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (!requiredRole) {
        return false;
      }

      if (!req.headers.authorization) {
        throw new UnauthorizedException('Пользователь не авторизован');
      }

      const [ bearer, token ] = req.headers.authorization.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('Пользователь не авторизован');
      }

      const { exp } = this.jwtService.decode(token) as ITokenPayload
        & { exp: number };

      if (isExpiredToken(exp * 1000)) {
        this.tokensService.delete(token);

        throw new UnauthorizedException('Истёк срок действия токена');
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
