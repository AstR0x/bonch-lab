import * as _ from 'lodash';
import * as moment from 'moment';
import * as bcrypt from 'bcrypt';
import { SignOptions } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  MethodNotAllowedException,
} from '@nestjs/common';

import { RoleEnum } from 'src/users/enums/role.enum';
import { StatusEnum } from 'src/users/enums/status.enum';
import { userSensitiveFieldsEnum } from 'src/users/enums/protected-fields.enum';
import { IUser } from 'src/users/interfaces/user.interface';
import { IReadableUser } from 'src/users/interfaces/readable-user.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { GroupsService } from 'src/groups/groups.service';
import { TokensService } from 'src/tokens/tokens.service';
import { IUserToken } from 'src/tokens/interfaces/user-token.interface';
import { CreateUserTokenDto } from 'src/tokens/dto/create-user-token.dto';


import { SignInDto } from './dto/signin.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ITokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  private readonly clientAppUrl: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly groupsService: GroupsService,
    private readonly tokensService: TokensService,
    private readonly configService: ConfigService,
  ) {
    this.clientAppUrl = this.configService.get<string>('FE_APP_URL');
  }

  async signUp(createUserDto: CreateUserDto): Promise<boolean> {
    const candidate = await this.usersService.findByEmail(createUserDto.email);

    if (!candidate) {
      // Если регистрируется студент
      if (createUserDto.role === RoleEnum.student) {
        // Находим группу, которую он указал
        const group = await this.groupsService.getGroupById(createUserDto.group);

        // Проверяем сходство кодовых слов
        if (createUserDto.codeword === group.codeword) {
          // Создаём пользователя
          const user = await this.usersService.create(createUserDto);
          // В группу добавляем id студента
          group.students.push(user._id);
          // Сохраняем изменения
          await group.save();
        } else {
          throw new BadRequestException({
            message: 'Неверное кодовое слово',
          });
        }
      } else if (createUserDto.role === RoleEnum.teacher) {
        if (createUserDto.codeword === process.env.TEACHER_CODEWORD) {
          // Создаём пользователя
          const user = await this.usersService.create(createUserDto);
        } else {
          throw new BadRequestException({
            message: 'Неверное кодовое слово'
          });
        }
      }

      return true;
    }

    throw new BadRequestException({ message: 'Такая электронная почта уже используется' });
  }

  async signIn({ email, password }: SignInDto): Promise<string> {
    // Находим пользователя по email
    const user = await this.usersService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      // Генерируем токен
      const token = await this.generateToken(user);

      return token
    }


    throw new BadRequestException({ message: 'Неверный логин или пароль' });
  }

  async generateToken(user: IUser, withStatusCheck = true): Promise<string> {
    // Если пользователь не подтверждён, то кидаем ошибку
    if (withStatusCheck && user.status !== StatusEnum.active) {
      throw new MethodNotAllowedException();
    }
    const tokenPayload: ITokenPayload = {
      _id: user._id,
      name: user.name,
      surname: user.surname,
      patronymic: user.patronymic,
      status: user.status,
      role: user.role,
      email: user.email,
    };
    const token = await this.jwtService.sign(tokenPayload);
    const expireAt = moment().add(1, 'day').toISOString();

    await this.saveToken({
      token,
      expireAt,
      uId: user._id,
    });

    return token;
  }

  private async verifyToken(token): Promise<any> {
    const data = this.jwtService.verify(token) as ITokenPayload;
    const tokenExists = await this.tokensService.exists(data._id, token);

    if (tokenExists) {
      return data;
    }
    throw new UnauthorizedException();
  }

  private saveToken(
    createUserTokenDto: CreateUserTokenDto,
  ): Promise<IUserToken> {
    return this.tokensService.create(createUserTokenDto);
  }
}