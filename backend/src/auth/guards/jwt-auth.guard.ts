import * as moment from 'moment';
import { Observable } from 'rxjs';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TokensService } from 'src/tokens/tokens.service';
import { ITokenPayload } from 'src/auth/interfaces/token-payload.interface';

import { isExpiredToken } from '../utils';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly tokensService: TokensService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      if (!req.headers.authorization) {
        throw new UnauthorizedException('Пользователь не авторизован');
      }

      const [bearer, token] = req.headers.authorization.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('Пользователь не авторизован');
      }

      const { exp } = this.jwtService.decode(token) as ITokenPayload & {
        exp: number;
      };

      if (isExpiredToken(exp * 1000)) {
        this.tokensService.delete(token);

        throw new UnauthorizedException('Истёк срок действия токена');
      }

      const user = this.jwtService.verify(token);
      const isTokenExist = await this.tokensService.exists(user._id, token);

      if (isTokenExist) {
        return true;
      }

      throw new UnauthorizedException('Пользователь не авторизован');
    } catch (error) {
      throw error;
    }
  }
}
