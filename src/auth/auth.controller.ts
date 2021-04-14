import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {
  Get,
  Post,
  Patch,
  Body,
  Controller,
  ValidationPipe,
  Query,
  UseGuards,
} from '@nestjs/common';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { IUser } from 'src/users/interfaces/user.interface';
import { IReadableUser } from 'src/users/interfaces/readable-user.interface';
import { GetUser } from 'src/components/decorators/get-user.decorator';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { ConfirmAccountDto } from './dto/confirm-account.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация пользователя.' })
  @Post('/sign-up')
  async signUp(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ): Promise<boolean> {
    return this.authService.signUp(createUserDto);
  }

  @ApiOperation({ summary: 'Авторизация пользователя.' })
  @Post('/sign-in')
  async signIn(
    @Body(new ValidationPipe()) signInDto: SignInDto,
  ): Promise<string> {
    return await this.authService.signIn(signInDto);
  }
}
