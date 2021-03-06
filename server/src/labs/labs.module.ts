import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from 'src/auth/auth.module';
import { TokensModule } from 'src/tokens/tokens.module';

import { LabSchema, CommentSchema } from './schemas';
import { LabsController } from './labs.controller';
import { LabsService } from './labs.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Labs', schema: LabSchema }]),
    MongooseModule.forFeature([{ name: 'Comments', schema: CommentSchema }]),
    forwardRef(() => AuthModule),
    TokensModule,
  ],
  providers: [LabsService],
  controllers: [LabsController],
  exports: [LabsService],
})
export class LabsModule {}
