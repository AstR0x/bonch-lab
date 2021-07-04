import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

import { IUser } from 'src/users/interfaces/user.interface';
import { TokensService } from 'src/tokens/tokens.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly tokensService: TokensService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req, user: Partial<IUser>) {
    const token = req.headers.authorization.slice(7);
    const tokenExists = await this.tokensService.exists(user._id, token);
    if (tokenExists) {
      return user;
    }
    throw new UnauthorizedException();
  }
}
