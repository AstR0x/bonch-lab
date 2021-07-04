import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { TokensModule } from './tokens/tokens.module';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { TasksModule } from './tasks/tasks.module';
import { LabsModule } from './labs/labs.module';
import { DictionariesModule } from './dictionaries/dictionaries.module';
import { configModule } from './configure.root';

@Module({
  imports: [
    AuthModule,
    TokensModule,
    UsersModule,
    GroupsModule,
    TasksModule,
    LabsModule,
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
