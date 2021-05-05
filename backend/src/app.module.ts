import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TokensModule } from './tokens/tokens.module';
import { TasksModule } from './tasks/tasks.module';
import { GroupsModule } from './groups/groups.module';
import { DictionariesModule } from './dictionaries/dictionaries.module';
import { configModule } from './configure.root';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TokensModule,
    TasksModule,
    GroupsModule,
    DictionariesModule,
    configModule,
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }),
  ],
})
export class AppModule {}
