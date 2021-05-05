import { ApiOperation, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import {
  Get,
  Post,
  Req,
  Body,
  Controller,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';

import { CreateUserDto } from 'src/users/dto';

import { JwtAuthGuard } from './guards';
import { SignInDto } from './dto';
import { AuthService } from './auth.service';

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
    return this.authService.signIn(signInDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Выход пользователя.' })
  @UseGuards(JwtAuthGuard)
  @Get('/sign-out')
  async signOut(@Req() request: Request): Promise<boolean> {
    return this.authService.signOut(request);
  }
}
