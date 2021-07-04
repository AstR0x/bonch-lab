import * as moment from 'moment';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  BadRequestException,
  MethodNotAllowedException,
} from '@nestjs/common';

import { RoleEnum, StatusEnum } from 'src/users/enums';
import { IUser } from 'src/users/interfaces';
import { CreateUserDto } from 'src/users/dto';
import { IToken } from 'src/tokens/interfaces';
import { CreateUserTokenDto } from 'src/tokens/dto';
import { UsersService } from 'src/users/users.service';
import { GroupsService } from 'src/groups/groups.service';
import { TasksService } from 'src/tasks/tasks.service';
import { LabsService } from 'src/labs/labs.service';
import { TokensService } from 'src/tokens/tokens.service';

import { SignInDto } from './dto';
import { ITokenPayload } from './interfaces';

@Injectable()
export class AuthService {
  private readonly clientAppUrl: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly groupsService: GroupsService,
    private readonly tasksService: TasksService,
    private readonly labsService: LabsService,
    private readonly tokensService: TokensService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<boolean> {
    const candidate = await this.usersService.findUserByEmail(
      createUserDto.email,
    );

    if (!candidate) {
      if (createUserDto.role === RoleEnum.Student) {
        const group = await this.groupsService.findGroupById(
          createUserDto.group,
        );

        if (createUserDto.codeword === group.codeword) {
          // Создаём студента
          const user = await this.usersService.createUser(createUserDto);
          // В группу добавляем id студента
          group.students.push(user._id);
          // Сохраняем группу
          await group.save();
          // Получаем идентификаторы задач, которые студент будет выполнять
          const ids = await this.tasksService.getRandomTaskIds();
          // Получаем массив с лабораторными работами
          const labs = await Promise.all(
            ids.map((id) => this.labsService.createLab(id, user._id)),
          );
          // Кладём идентификаторы лабораторных работ в студента
          user.labs = labs.map((lab) => lab.id) as string[];
          // Сохраняем студента
          await user.save();
        } else {
          throw new BadRequestException('Неверное кодовое слово');
        }
      } else if (createUserDto.role === RoleEnum.Teacher) {
        if (createUserDto.codeword === process.env.TEACHER_CODEWORD) {
          // Создаём пользователя
          await this.usersService.createUser(createUserDto);
        } else {
          throw new BadRequestException('Неверное кодовое слово');
        }
      }

      return true;
    }

    throw new BadRequestException('Электронная почта занята');
  }

  async signIn(signInDto: SignInDto): Promise<string> {
    const user = await this.usersService.findUserByEmail(signInDto.email);

    if (user && (await bcrypt.compare(signInDto.password, user.password))) {
      const token = await this.generateToken(user);

      return token;
    }

    throw new BadRequestException('Неверный логин или пароль');
  }

  async signOut(req: Request): Promise<boolean> {
    const [, token] = req.headers.authorization.split(' ');

    await this.tokensService.deleteToken(token);

    return true;
  }

  async generateToken(user: IUser, withStatusCheck = true): Promise<string> {
    if (withStatusCheck && user.status !== StatusEnum.Confirmed) {
      throw new MethodNotAllowedException();
    }

    const tokenPayload: ITokenPayload = {
      id: user._id,
      name: user.name,
      surname: user.surname,
      patronymic: user.patronymic,
      email: user.email,
      status: user.status,
      role: user.role,
      group: user.group,
      labs: user.labs,
      regDate: user.regDate,
    };

    const token = await this.jwtService.sign(tokenPayload);
    const expireAt = moment().add(24, 'h').toISOString();

    await this.saveToken({ token, expireAt, uId: user._id });

    return token;
  }

  private saveToken(createUserTokenDto: CreateUserTokenDto): Promise<IToken> {
    return this.tokensService.createToken(createUserTokenDto);
  }
}
