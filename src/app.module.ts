import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TokensModule } from './tokens/tokens.module';
import { TasksModule } from './tasks/tasks.module';
import { GroupsModule } from './groups/groups.module';
import { configModule } from './configure.root';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TokensModule,
    TasksModule,
    GroupsModule,
    configModule,
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  ],
})
export class AppModule { }
