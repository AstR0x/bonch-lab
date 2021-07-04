import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from 'src/auth/auth.module';
import { TokensModule } from 'src/tokens/tokens.module';

import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tasks', schema: TaskSchema }]),
    forwardRef(() => AuthModule),
    TokensModule,
  ],
  providers: [TasksService],
  controllers: [TasksController],
  exports: [TasksService],
})
export class TasksModule {}
