import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from 'src/users/users.module';
import { GroupsModule } from 'src/groups/groups.module';
import { TasksModule } from 'src/tasks/tasks.module';
import { LabsModule } from 'src/labs/labs.module';
import { TokensModule } from 'src/tokens/tokens.module';
import { configModule } from 'src/configure.root';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

/**
 * Модуль авторизации
 */
@Module({
  imports: [
    UsersModule,
    forwardRef(() => GroupsModule),
    forwardRef(() => TasksModule),
    forwardRef(() => LabsModule),
    TokensModule,
    configModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
