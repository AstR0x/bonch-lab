import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from './schemas';
import { UsersService } from './users.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
