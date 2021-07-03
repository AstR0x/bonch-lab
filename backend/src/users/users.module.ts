import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from 'src/auth/auth.module';
import { LabsModule } from 'src/labs/labs.module';
import { GroupsModule } from 'src/groups/groups.module';
import { TokensModule } from 'src/tokens/tokens.module';

import { UserSchema } from './schemas';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]),
    forwardRef(() => AuthModule),
    TokensModule,
    GroupsModule,
    LabsModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
